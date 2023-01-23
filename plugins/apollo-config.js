import { HttpLink } from 'apollo-link-http';
import fetch from 'cross-fetch';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, concat } from 'apollo-link';

export default ctx => {
  const httpLink = new HttpLink({
    uri: ctx.$config.apiEndpoint,
    headers: {
      'X-ApiKey': ctx.$config.apiKey
    },
    fetch
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    if (ctx.$cookies.get('ralph-auth')) {
      operation.setContext(({ headers }) => {
        return {
          headers: {
            ...headers,
            Authorization: `Bearer ${ctx.$cookies.get('ralph-auth')}`
          }
        };
      });
    }

    if (ctx.store.state.channelId) {
      operation.variables = {
        ...operation.variables,
        channelId: ctx.store.state.channelId
      };
    }
    if (ctx.store.state.marketId) {
      operation.variables = {
        ...operation.variables,
        marketId: ctx.store.state.marketId
      };
    }
    if (ctx.i18n.localeProperties.iso) {
      operation.variables = {
        ...operation.variables,
        languageId: ctx.i18n.localeProperties.iso
      };
    }

    return forward(operation);
  });

  const cache = new InMemoryCache();

  return {
    link: concat(authMiddleware, httpLink),
    cache,
    defaultHttpLink: false
  };
};
