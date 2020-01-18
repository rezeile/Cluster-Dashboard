import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error';
import './App.css';
import Routes from './routes'

const httpLink = new HttpLink({
  uri: "http://localhost:3001/graphql"
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = localStorage.getItem('token');

    if (token) {
      headers = { ...headers, 'x-token': token };
    }

    return { headers };
  });

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message === 'UNAUTHENTICATED') {
        console.log(client)
      }
    });
  }

  if (networkError) {
    if (networkError.statusCode === 401) {
      console.log(client)
    }
  }
});

const link = ApolloLink.from([authLink, errorLink, httpLink]);
const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache,
})

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ED011F'
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
});

class App extends Component {
  render() {
    return (
      <div>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
