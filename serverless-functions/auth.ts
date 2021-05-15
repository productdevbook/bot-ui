import { gql } from 'graphql-tag';
import { execute, makePromise } from 'apollo-link';
import { JsonWebToken } from '../utils/jwt';
import link from '../utils/httplink';

export default async (body: string) => {
  const {
    input: { data }
  } = JSON.parse(body);
  const options = {
    query: gql`
      query get_user($username: String!, $password: String!) {
        users(where: { username: { _eq: $username } }) {
          id
          username
          pwd_match(args: { pwd: $password })
        }
      }
    `,
    variables: {
      username: data.username,
      password: data.password
    },
    context: {
      headers: {
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_KEY || ''
      }
    }
  };
  // For single execution operations, a Promise can be used
  const checkpwd = await makePromise(execute(link, options));
  if (checkpwd.data?.users.length) {
    const user = checkpwd.data.users[0];
    if (user.pwd_match) {
      const accessToken = JsonWebToken.sign(user);
      JsonWebToken.verify(accessToken, JsonWebToken.public);
      console.log(`Authentication successful! Logged in as ${user.username}`);
      return accessToken;
    }
  }
  return false;
};
