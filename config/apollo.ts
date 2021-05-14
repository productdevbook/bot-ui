export const NuxtApolloConfig = {
  clientConfigs: {
    default: {
      httpEndpoint: process.env.GRAPHQL_ENDPOINT,
      inMemoryCacheOptions: {
        addTypename: false
      }
    }
  },
  watchLoading: '~/plugins/apollo/loading.ts'
};
