import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import {
  DefaultApolloClient,
  ApolloLink,
  onError,
  from,
} from '@vue/apollo-composable';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  const httpLink = new HttpLink({
    uri: nuxtApp.$config.apiEndpoint,
    headers: {
      'X-ApiKey': nuxtApp.$config.apiKey,
    },
    fetch,
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    if (nuxtApp.$cookies.get('ralph-auth')) {
      operation.setContext(({ headers }) => {
        return {
          headers: {
            ...headers,
            Authorization: `Bearer ${nuxtApp.$cookies.get('ralph-auth')}`,
          },
        };
      });
    }

    if (nuxtApp.store.state.channel.id) {
      operation.variables = {
        ...operation.variables,
        channelId: nuxtApp.store.state.channel.id,
      };
    }
    if (nuxtApp.store.state.channel.currentMarket) {
      operation.variables = {
        ...operation.variables,
        marketId: nuxtApp.store.state.channel.currentMarket,
      };
    }
    if (nuxtApp.i18n.localeProperties.iso) {
      operation.variables = {
        ...operation.variables,
        languageId: nuxtApp.i18n.localeProperties.iso,
      };
    }

    return forward(operation);
  });

  const cache = new InMemoryCache();

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        nuxtApp.$ralphLogError(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        );
      });
    }
    if (networkError) {
      nuxtApp.$ralphLogError(`[Network error]: ${networkError}`);
    }
  });

  const link = from([authMiddleware, errorLink, httpLink]);

  const apolloClient = new ApolloClient({
    cache,
    link,
    defaultHttpLink: false,
  });

  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient);
});
