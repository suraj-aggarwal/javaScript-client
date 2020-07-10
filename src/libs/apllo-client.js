import { InMemoryCache } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

const reactAppGraphalUri = process.env.REACT_APP_GRAPHQL_API_URL;
const link = new HttpLink({
  uri: reactAppGraphalUri,
});
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({ cache, link });

export default apolloClient;
