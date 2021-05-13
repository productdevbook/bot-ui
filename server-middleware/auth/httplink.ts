// HTTP connection to Hasura
import { createHttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';

const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: process.env.GRAPHQL_ENDPOINT ?? 'http://localhost:8080/v1/graphql',
  fetch: fetch as any
});

export default httpLink;
