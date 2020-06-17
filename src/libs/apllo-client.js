import { InMemoryCache } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import authLink from './graphql-client';

const reactAppGraphalUri = process.env.REACT_APP_GRAPHQL_API_URL;
const httpLink = new HttpLink({
  uri: reactAppGraphalUri,
});
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({ cache, link: authLink.concat(httpLink) });

export default apolloClient;
