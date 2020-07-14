import { InMemoryCache } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import authLink from './graphql-client';

const reactAppGraphalUri = process.env.REACT_APP_GRAPHQL_API_URL;
const webSocketLink = process.env.REACT_APP_API_WS_URL;
const httpLink = new HttpLink({
  uri: reactAppGraphalUri,
});

const wsLink = new WebSocketLink(
  {
    uri: webSocketLink,
    options: {
      reconnect: true,
    },
  },
);

const link = split(({ query }) => {
  const definition = getMainDefinition(query);
  return (
    definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
  );
},
wsLink,
authLink.concat(httpLink));
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({ cache, link });

export default apolloClient;
