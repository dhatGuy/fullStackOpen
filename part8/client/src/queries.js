import { gql } from "@apollo/client";

const AUTHOR_FRAGMENT = gql`
  fragment AuthorDetails on Author {
    id
    born
    name
    bookCount
  }
`;

const BOOK_FRAGMENT = gql`
  fragment BookDetails on Book {
    id
    title
    author {
      name
    }
    published
    genres
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_FRAGMENT}
`;

export const ALL_BOOKS = gql`
  query ($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_FRAGMENT}
`;

export const ADD_BOOK = gql`
  mutation addBook($input: addBookInput) {
    addBook(input: $input) {
      ...BookDetails
    }
  }
  ${BOOK_FRAGMENT}
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($input: editAuthorInput) {
    editAuthor(input: $input) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_FRAGMENT}
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ME = gql`
  query {
    me {
      favoriteGenre
      username
      id
    }
  }
`;

export const GET_GENRES = gql`
  query {
    allGenres
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_FRAGMENT}
`;
