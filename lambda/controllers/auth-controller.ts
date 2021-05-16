import {
  apiController,
  body,
  POST,
  Controller,
  apiOperation,
  apiRequest,
  apiResponse,
  api,
  controllerProduces
} from 'ts-lambda-api';
import { injectable, inject } from 'inversify';
import parse from 'destr';
import { gql } from 'graphql-tag';
import { execute, makePromise } from 'apollo-link';
import { AccessDeniedError } from '@/error';
import link from '~/utils/httplink';
import { Jwt } from '~/utils/jwt';

@apiController('/auth')
@controllerProduces('application/json')
@api('Auth Api', 'Log user in, refresh JWT tokens etc.')
@injectable()
export class AuthController extends Controller {
  @inject(Jwt) jwt: Jwt;

  @POST('/login')
  @apiOperation({ name: 'login user', description: 'Checks user credentials and returns a JWT token.' })
  @apiRequest({
    class: () => {},
    description: 'user credentials'
  })
  @apiResponse(200, {
    class: () => ({ accessToken: 'JWT Token', expires: 600 }),
    description: 'JWT Token for successful login.'
  })
  @apiResponse(403, {
    class: AccessDeniedError,
    description: 'Authentication failed.'
  })
  async login(@body payload: any) {
    try {
      const {
        input: { data }
      } = parse(payload);
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

      const result = await makePromise(execute(link, options));
      if (result.data?.users.length) {
        const user = result.data.users[0];
        if (user.pwd_match) {
          const { accessToken, expires } = this.jwt.sign(user);
          // For safety we'll try to verify the JWT after signing
          this.jwt.verify(accessToken, this.jwt.public);
          console.log(`Authentication successful! Logged in as ${user.username}`);
          return this.response.status(200).send({ accessToken, expires });
        }
      }
    } catch (e) {
      console.log(`Authentication error: ${e.message}`);
    }
    throw new AccessDeniedError('Authentication failed.');
  }

  @POST('/refresh-token')
  async refresh() {
    const token = this.request.headers.authorization?.split(' ');
    const id = this.request.headers['x-hasura-user-id'];
    if (!token) throw new AccessDeniedError('No JWT token found.');

    const options = {
      query: '' as any,
      variables: {},
      context: {
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_ADMIN_KEY || ''
        }
      }
    };
    try {
      options.query = gql`
        query get_user($id: uuid!) {
          users_by_pk(id: $id) {
            last_seen
          }
        }
      `;
      options.variables = {
        id
      };
      const result = await makePromise(execute(link, options));

      if (result.data?.users_by_pk) {
        const user = result.data.users_by_pk;
        console.log(user);
        // If last JWT refresh was an hour ago we will have to decline refresh and log the user out
        const expirationTimeframe = 60 * 60 * 1000;
        if (Date.now() - user.last_seen <= expirationTimeframe) {
          const { accessToken, expires } = this.jwt.refresh(token[1], {
            verify: {
              audience: this.jwt.options.audience,
              issuer: this.jwt.options.issuer
            }
          });
          return this.response.status(200).send({ accessToken, expires });
        }
      }
    } catch (e) {
      console.log(e);
    }
    throw new AccessDeniedError('Could not refresh JWT.');
  }
}
