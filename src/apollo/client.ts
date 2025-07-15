import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from, operationName } from '@apollo/client';

const httpLink = new HttpLink({
	uri: 'http://localhost:5000/graphql', // Replace with your GraphQL API
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('authToken'); // Replace with your token storage logic
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      operationName: 'login'
    },
  });
  console.log('GraphQL Request:', operation);
  return forward(operation).map((response) => {
    console.log('GraphQL Response:', response);
    return response;
  });
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;