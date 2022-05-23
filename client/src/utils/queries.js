import { gql } from '@apollo/client';

// Similar to query we wrote using the Apollo Studio Explorer,
export const QUERY_USER = gql`
query User($username: String!) {
  user(username: $username) {
    _id
    username
    email
    bookCount
    
  }
}
`;
 
// We aren't passing any variables to it
export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        _id
        title
      }
    }
  }
`;

// Use the same query we created and simply ask for less.
export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      bookCount
      
    }
  }
`;