import { onError } from '@apollo/client/link/error';
import { Context } from '@nuxt/types';

export default function ({ $config }: Context) {
  const httpEndpoint = $config.graphQlEndpoint;

  const link = onError(({ graphQLErrors }) => {
    graphQLErrors?.forEach((err) => {
      console.log(err);
    });
  });

  return {
    link,
    httpEndpoint,
    inMemoryCacheOptions: {
      addTypename: false
    }
  };
}
