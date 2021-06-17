import { NuxtApolloConfiguration } from '@nuxtjs/apollo/types/nuxt';

export const NuxtApolloConfig = {
  clientConfigs: {
    default: {
      httpEndpoint: process.env.GRAPHQL_ENDPOINT,
      inMemoryCacheOptions: {
        addTypename: false
      },
      tokenName: 'apollo-token'
    }
  },
  defaultOptions: {
    // See 'apollo' definition
    // For example: default query options
    $query: {
      loadingKey: 'loading',
      fetchPolicy: 'cache-and-network'
    }
  },
  tokenExpires: process.env.REFRESH_INTERVAL || 300
} as NuxtApolloConfiguration;
