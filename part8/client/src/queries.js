import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      born
      name
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      id
      title
      author
      published
      genres
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($input: addBookInput) {
    addBook(input: $input) {
      id
      title
      author
      published
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($input: editAuthorInput) {
    editAuthor(input: $input) {
      id
      born
      name
      bookCount
    }
  }
`;
