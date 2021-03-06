import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      username
      _id
    }
  }
}
`; 
 
export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation SaveBook($bookId: String, $description: String, $title: String, $image: String, $link: String, $authors: [String]) {
    saveBook(bookId: $bookId, description: $description, title: $title, image: $image, link: $link, authors: $authors) {
      username
      password
      email
      bookCount
      _id
    }
  }
`
