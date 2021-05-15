import { onError } from '@apollo/client/link/error';
import { Context } from '@nuxt/types';

export default function ({ $config, $apolloHelpers, $toast, redirect }: Context) {
  const httpEndpoint = $config.graphQlEndpoint;

  const link = onError(({ graphQLErrors }) => {
    graphQLErrors?.forEach((err) => {
      console.log(err);
      if (err.message === 'Authentication failed!') {
        $apolloHelpers.onLogout();
        $toast.error('Authentication issue. Please log in again.');
        redirect('/login');
      }
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
