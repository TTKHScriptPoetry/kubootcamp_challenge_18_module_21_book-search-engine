// -- Import the gql tagged template function
// Tagged templates are an advanced use of template literals, and were introduced with ES6 as well
const { gql } = require('apollo-server-express'); 

// -- Create our typeDefs, all type definitions need to specify what type of data is expected in return
// we created a query named helloWorld (as a function)
// type of data to be returned by this query will be a string.

// const typeDefs = gql`
//   type Query {  
//     helloWorld: String
//   }
// `;

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    password: String
    email: String
    bookCount: Int
    savedBooks: [Book]
     
  },

  type Book {
    _id: ID
    bookId: String
    description: String
    title: String
    image: String
    link: String
    authors: [String]
    
  }

  type Query {     
    me: User
    users: [User]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(autoId: ID, bookId: String, description: String, title: String, image: String, link: String, authors: [String]): User
    removeBook(bookId: String): User
  }

`;

module.exports = typeDefs;