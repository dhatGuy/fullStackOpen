const mongoose = require("mongoose");
const Book = require("./models/Book");
const Author = require("./models/Author");
const { UserInputError, AuthenticationError } = require("apollo-server-core");
const User = require("./models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  Query: {
    me: (_, __, context) => context.currentUser,
    bookCount: () => Book.collection.countDocuments({}),
    authorCount: () => Author.collection.countDocuments({}),
    allBooks: async (_, { author, genre }) => {
      try {
        const findAuthor = await Author.findOne({ name: author });
        if (!findAuthor) {
          throw new Error("Author not found");
        }
        if (author) {
          if (genre) {
            return await Book.find({
              author: findAuthor._id,
              genres: { $in: [genre] },
            }).populate("author");
          }
          return await Book.find({
            author: findAuthor._id,
          }).populate("author");
        }
        if (genre) {
          return await Book.find({
            genres: { $in: [genre] },
          }).populate("author");
        }

        return await Book.find({}).populate("author");
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    allAuthors: async () => {
      return Author.find({});
    },
  },
  Author: {
    bookCount: async (parent) => {
      return await Book.collection.countDocuments({ author: parent._id });
    },
  },
  Mutation: {
    addBook: async (_, { input }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const { author, ...newBook } = input;
      let authorToSave;

      try {
        const findAuthor = await Author.findOne({
          name: author.name,
        });
        const findBook = await Book.findOne({ title: newBook.title });

        if (findBook) {
          throw new UserInputError("Book exist already", {
            invalidArgs: newBook.title,
          });
        }

        if (findAuthor) {
          authorToSave = findAuthor;
        } else {
          const newAuthor = new Author({ ...author });
          newAuthor.save();
          authorToSave = newAuthor;
        }

        const book = new Book({
          ...newBook,
          author: authorToSave,
        });
        return book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: input,
        });
      }
    },
    editAuthor: async (_, { input }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const { name, setBornTo } = input;
      return await Author.findOneAndUpdate(
        { name },
        { born: setBornTo },
        { new: true }
      );
    },
    createUser: async (_, { input }) => {
      try {
        await User.create({ ...input });
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: input,
        });
      }
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user || password !== "secret") {
        throw new UserInputError("Wrong credentials");
      }

      const tokenDetails = { username: user.username, id: user._id };
      return {
        value: jwt.sign(tokenDetails, process.env.JWT_SECRET),
      };
    },
  },
};
