export const NuxtApolloConfig = {
  clientConfigs: {
    default: {
      httpEndpoint: process.env.GRAPHQL_ENDPOINT,
      inMemoryCacheOptions: {
        addTypename: false
      }
    }
  },
  watchLoading: '~/plugins/apollo/loading.ts',
  errorHandler: '~/plugins/apollo/error.ts',
  defaultOptions: {
    // See 'apollo' definition
    // For example: default query options
    $query: {
      loadingKey: 'loading',
      fetchPolicy: 'cache-and-network'
    }
  }
};
