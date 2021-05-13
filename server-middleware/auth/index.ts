import { gql } from 'graphql-tag';
import bodyParser from 'body-parser';
import express from 'express';
import { execute, makePromise } from 'apollo-link';
import link from './httplink';
import { Jwt } from './jwt';

const secretKey = process.env.RS256_SECRET_KEY;
const publicKey = process.env.RS256_PUBLIC_KEY;
if (!secretKey || !publicKey) throw new Error('Public/Secret key is undefined.');
const app = express();
const jwt = new Jwt(secretKey, publicKey);
const operation = {
  context: {
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_KEY || ''
    }
  }
};
app.use(bodyParser.json());
app.all('/', async (req, res) => {
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
});

// Refresh JWT
app.all('/refresh-token', (req, res) => {
  try {
    const token = req.headers?.authorization?.split(' ');
    if (!token) throw new Error('No JWT token found.');
    const accessToken = jwt.refresh(token[1], {
      verify: {
        audience: jwt.options.audience,
        issuer: jwt.options.issuer
      }
    });
    return res.status(200).json({ accessToken });
  } catch (e) {
    console.log(e);
    return res.status(404).send({ message: 'Could not refresh JWT. Session terminated.' });
  }
});

export default app;
