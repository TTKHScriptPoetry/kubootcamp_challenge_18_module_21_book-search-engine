const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    _id: ID
    bookId: String
    description: String
    title: String
    image: String
    link: String
    author: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(author: [String], description: String, title: String, bookId: String, image: String, link: String): User
    removeBook(bookId: String): User
  }
`;

module.exports = typeDefs;

// type Mutation {
//   login(email: String!, password: String!): Auth
//   addUser(username: String!, email: String!, password: String!): Auth
//   saveBook(author: [ { String } ], description: String, title: String, bookId: String, image: String, link: String): User
//   removeBook(bookId: String): User
// }

// type Book {
//   _id: ID
//   bookId: String
//   description: String
//   title: String
//   image: String
//   link: String
//   author: [ { String } ]
// }

// type Author {
//   name: String
// }

  // type Query {
  //   me: User
  //   users: [User]
  //   user(username: String!): User
  //   books(username: String): [Book]
  //   book(_id: ID!): Book
  // }

  // type Mutation {
  //   login(email: String!, password: String!): Auth
  //   addUser(username: String!, email: String!, password: String!): Auth
  //   saveBook(author: Author, description: String, title: String, bookId: String, image: String, link: String): User
  //   removeBook(bookId: String): User
  // }

//   input SpecificBook {
//     description: String
//     title: String
//     bookId: String
//     image: String 
//     link: String
// }
