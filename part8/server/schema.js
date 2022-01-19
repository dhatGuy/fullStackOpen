const { gql } = require("apollo-server-core");

module.exports = gql`
  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    addBook(input: addBookInput): Book
    allGenres: [String!]!
  }

  type Book {
    id: ID!
    title: String!
    author: Author
    published: Int!
    genres: [String!]!
  }

  type Subscription {
    bookAdded: Book!
  }

  type Author {
    id: ID!
    born: Int
    name: String!
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addBook(input: addBookInput): Book!
    editAuthor(input: editAuthorInput): Author
    login(username: String!, password: String!): Token
    createUser(input: createUserInput): User
  }

  input createUserInput {
    username: String!
    favoriteGenre: String!
  }

  input editAuthorInput {
    name: String!
    setBornTo: Int!
  }

  input createAuthorInput {
    born: Int
    name: String!
  }

  input addBookInput {
    author: createAuthorInput
    title: String!
    published: Int!
    genres: [String!]!
  }
`;
