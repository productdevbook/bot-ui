import jwt, { Algorithm, VerifyOptions } from 'jsonwebtoken';

export class Jwt {
  secret = '';
  public = '';
  options = {
    algorithm: 'RS256' as Algorithm,
    expiresIn: Number(process.env.REFRESH_INTERVAL) * 1000,
    issuer: '@braks',
    audience: 'https://bot-ui-nu.vercel.app/login'
  };

  constructor(secret: string, publicKey: string) {
    this.secret = secret;
    this.public = publicKey;
  }

  sign(user: Record<string, string>) {
    const claims = {
      sub: user.id,
      name: user.username,
      admin: false,
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['user'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': user.id
      }
    };

    return jwt.sign(claims, this.secret, this.options);
  }

  refresh(token: string, refreshOptions?: { verify: VerifyOptions }) {
    const payload = jwt.verify(token, this.public, refreshOptions?.verify) as Record<string, unknown>;
    delete payload.iat;
    delete payload.exp;
    delete payload.nbf;
    delete payload.jti;
    delete payload.aud;
    // The first signing converted all needed options into claims, they are already in the payload
    return jwt.sign(payload, this.secret);
  }
}
