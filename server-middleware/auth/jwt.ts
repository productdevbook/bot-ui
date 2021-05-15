import { createDecipheriv, Decipher } from 'crypto';
import { sign, verify, Algorithm, VerifyOptions } from 'jsonwebtoken';
import AuthConfig from '../../config/auth';

export class Jwt {
  secret = '';
  public = '';
  decipher: Decipher;
  options = {
    algorithm: 'RS256' as Algorithm,
    expiresIn: Number(process.env.REFRESH_INTERVAL) * 1000,
    issuer: '@braks',
    audience: 'https://bot-ui-nu.vercel.app/login'
  };

  constructor() {
    if (!process.env.ENCRYPTION_KEY || !process.env.ENCRYPTION_IV) throw new Error('Encryption key/iv not set.');

    const algorithm = 'aes-128-cbc';
    this.decipher = createDecipheriv(algorithm, process.env.ENCRYPTION_KEY || '', process.env.ENCRYPTION_IV || '');

    const { pk, sk } = AuthConfig;
    this.secret = this.decipherKey(sk);
    this.public = this.decipherKey(pk);
  }

  decipherKey(key: string) {
    let decrypted = this.decipher.update(key, 'base64', 'utf8');

    decrypted += this.decipher.final('utf8');

    return JSON.parse(decrypted);
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

    return sign(claims, this.secret, this.options);
  }

  refresh(token: string, refreshOptions?: { verify: VerifyOptions }) {
    const payload = verify(token, this.public, refreshOptions?.verify) as Record<string, unknown>;
    delete payload.iat;
    delete payload.exp;
    delete payload.nbf;
    delete payload.jti;
    delete payload.aud;
    // The first signing converted all needed options into claims, they are already in the payload
    return sign(payload, this.secret);
  }
}
