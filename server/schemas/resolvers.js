const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth');
const bookSchema = require('../models/Book');

// const resolvers = {
//   Query: {
//     helloWorld: () => {
//       return 'Hello world! I am here at the gate.';
//     }
//   }
// };

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('savedBooks')

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    // for testing only
    users: async () => {
      return User.find()
        .select('-__v -password')
    }
  }
  ,

  Mutation: 
  {
    // (1)
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);  
      return { token, user };
    },
    // (2)
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    }
    ,

    saveBook: async (parent, args, context) => {
      if (context.user) {
        // const book = await User.savedBooks.create({ ...args, username: context.user.username });
        const book = await Book.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: book._id } },
          { new: true }
        );
        const updateUser = User.findOneAndUpdate(
          { _id: context.user._id },
        );
        return updateUser;
      }
    }
    ,
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull:  { savedBooks: {bookId: bookId } } },
          { new: true, runValidators: true }
        );

        return updateUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

  } // end of Mutation
};    // end of resolver

