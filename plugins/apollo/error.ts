import { Context } from '@nuxt/types';
import { GraphQLError } from 'graphql';

export default (gqlErr: GraphQLError, { error }: Context) => {
  console.log(gqlErr.message);
  error({ message: 'Authentication error.' });
};
