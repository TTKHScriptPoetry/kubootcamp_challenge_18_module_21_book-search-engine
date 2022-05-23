import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, } from '@apollo/client';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import NoMatch from './pages/NoMatch';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({uri: '/graphql',});

// -- Use the setContext() function to retrieve the token from localStorage 
// and set the HTTP request headers of every request to include the token
// -- Because we're not using the first parameter, but we still need to access 
// the second one, we can use an underscore _ to serve as a placeholder for the first parameter.
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token_in_deepthotapp');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // link: httpLink,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
            <Route  path='/' component={SearchBooks} />
            <Route  path='/saved' component={SavedBooks} />
            <Route path="*" element={<NoMatch />} />
        </Routes>
    </Router>
    </ApolloProvider>
  );
}



// function App() {
//   return (
    // <Router>
    //   <>
    //     <Navbar />
    //     <Switch>
    //       <Route exact path='/' component={SearchBooks} />
    //       <Route exact path='/saved' component={SavedBooks} />
    //       <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
    //     </Switch>
    //   </>
    // </Router>
//   );
// }

export default App;
