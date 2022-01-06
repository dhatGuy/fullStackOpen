const { ApolloServer, gql } = require("apollo-server");

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(name: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    addBook(input: addBookInput): Book
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  }

  type Author {
    id: ID!
    born: Int
    name: String!
    bookCount: Int!
  }

  type Mutation {
    addBook(input: addBookInput): Book!
    editAuthor(input: editAuthorInput): Author
  }

  input editAuthorInput {
    name: String!
    setBornTo: Int!
  }

  input addBookInput {
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  }
`;

const resolvers = {
  Query: {
    bookCount: (_, args) => books.length,
    authorCount: (_, args) => authors.length,
    allBooks: (_, { name, genre }) => {
      let filteredBooks = books;
      if (name) {
        filteredBooks = filteredBooks.filter((book) => book.author === name);
      }

      if (genre) {
        filteredBooks = filteredBooks.filter((book) =>
          book.genres.includes(genre)
        );
      }
      return filteredBooks;
    },
    allAuthors: () => authors,
  },
  Author: {
    bookCount: (parent) => {
      const count = books.filter((book) => book.author === parent.name);
      return count.length;
    },
  },
  Mutation: {
    addBook: (_, { input }) => {
      const authorIndex = authors.findIndex(
        (author) => author.name === input.author
      );
      const newBook = {
        id: Date.now(),
        ...input,
      };
      if (authorIndex == -1) {
        authors.push({ id: Date.now(), name: input.author });
      }
      books.push(newBook);
      return newBook;
    },
    editAuthor: (_, { input }) => {
      const { name, setBornTo } = input;
      const index = authors.findIndex((author) => author.name === name);
      if (index == -1) return null;
      authors[index].born = setBornTo;
      return authors[index];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
