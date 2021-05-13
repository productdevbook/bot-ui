// HTTP connection to the API
import { createHttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';

const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: process.env.GRAPHQL_ENDPOINT ?? 'http://localhost:8080/v1/graphql',
  fetch: fetch as any
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const Apollo = new ApolloClient({
  link: httpLink,
  cache
});
