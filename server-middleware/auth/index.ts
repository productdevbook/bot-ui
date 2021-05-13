import { gql } from 'graphql-tag';
import bodyParser from 'body-parser';
import express from 'express';
import { Apollo } from './apollo-client';
import { Jwt } from './jwt';

const app = express();
const jwt = new Jwt(process.env.RS256_SECRET_KEY || '', process.env.RS256_PUBLIC_KEY || '');
app.use(bodyParser.json());
app.all('/', async (req, res) => {
  console.log(req.url);
  const {
    input: { data }
  } = req.body;
  const response = await Apollo.query({
    context: {
      headers: {
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_KEY || ''
      }
    },
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
    }
  });
  const secret = process.env.RS256_SECRET_KEY;
  if (response.data.users.length && secret) {
    const user = response.data.users[0];
    if (user.password === data.password) {
      const accessToken = jwt.sign(user);
      console.log(`Authentication successful! Logged in as ${user.username}`);
      return res.status(200).json({ accessToken });
    }
  }
  return res.status(404).send({ message: 'Authentication failed.' });
});

app.all('/refresh-token', (req, res) => {
  try {
    console.log('refreshing JWT token');
    const token = req.headers?.authorization?.split(' ');
    if (!token) throw new Error('No JWT token found.');
    const accessToken = jwt.refresh(token[1], { verify: { audience: jwt.options.audience, issuer: jwt.options.issuer } });
    return res.status(200).json({ accessToken });
  } catch (e) {
    console.log(e);
    return res.status(404).send({ message: 'Could not refresh JWT. Session terminated.' });
  }
});

export default app;
