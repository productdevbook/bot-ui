import fs from 'fs';
import path from 'path';
import { gql } from 'graphql-tag';
import { execute, makePromise } from 'apollo-link';
import { Jwt } from '../server-middleware/auth/jwt';
import link from '../server-middleware/auth/httplink';

const secretKey = process.env.RS256_SECRET_KEY;
const publicKey = fs.readFileSync(path.join(__dirname, '/../../public.key.pub'), 'utf8');
if (!secretKey || !publicKey) throw new Error('Public/Secret key is undefined.');
const jwt = new Jwt(secretKey, publicKey);
const operation = {
  context: {
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_KEY || ''
    }
  }
};

export default async (req: any, res: any) => {
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
      const accessToken = jwt.sign(user);
      console.log(`Authentication successful! Logged in as ${user.username}`);
      return res.status(200).json({ accessToken });
    }
  }
  return res.status(404).send({ message: 'Authentication failed.' });
};
