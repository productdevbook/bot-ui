import { gql } from 'graphql-tag';
import { execute, makePromise } from 'apollo-link';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { JsonWebToken } from '../utils/jwt';
import link from '../utils/httplink';

const operation = {
  context: {
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_KEY || ''
    }
  }
};

export default async (req: VercelRequest, res: VercelResponse) => {
  const {
    input: { data }
  } = req.body;
  // For single execution operations, a Promise can be used
  const options = {
    query: gql`
      query get_user($username: String!) {
        users(where: { username: { _eq: $username } }) {
          id
          username
          password
        }
      }
    `,
    variables: {
      username: data.username
    },
    ...operation
  };
  const response = await makePromise(execute(link, options));
  if (response.data?.users.length) {
    const user = response.data.users[0];
    if (user.password === data.password) {
      const accessToken = JsonWebToken.sign(user);
      console.log(`Authentication successful! Logged in as ${user.username}`);
      return res.status(200).json({ accessToken });
    }
  }
  return res.status(404).send({ message: 'Authentication failed.' });
};
