import { createDecipheriv, Decipher } from 'crypto';
import { sign, verify, Algorithm, VerifyOptions } from 'jsonwebtoken';
import { injectable } from 'inversify';
import AuthConfig from '../config/auth';

@injectable()
export class Jwt {
  secret = '';
  public = '';
  options = {
    algorithm: 'RS256' as Algorithm,
    expiresIn: Number(process.env.REFRESH_INTERVAL || 600) * 1000,
    issuer: 'braks',
    audience: 'https://bot-ui.io'
  };

  constructor() {
    if (!process.env.ENCRYPTION_KEY || !process.env.ENCRYPTION_IV) throw new Error('Encryption key/iv not set.');

    const algorithm = 'aes-128-cbc';
    const cipher1 = createDecipheriv(algorithm, process.env.ENCRYPTION_KEY || '', process.env.ENCRYPTION_IV || '');
    const cipher2 = createDecipheriv(algorithm, process.env.ENCRYPTION_KEY || '', process.env.ENCRYPTION_IV || '');

    const { pk, sk } = AuthConfig;
    this.secret = Jwt._decipherKey(cipher1, sk);
    this.public = Jwt._decipherKey(cipher2, pk);
  }

  private static _decipherKey(cipher: Decipher, key: string) {
    let decrypted = cipher.update(key, 'base64', 'utf8');
    decrypted += cipher.final('utf8');
    return decrypted;
  }

  private _expiry() {
    return Math.floor(Date.now() + this.options.expiresIn);
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

    return { accessToken: sign(claims, this.secret, this.options), expires: this._expiry() };
  }

  verify = verify;

  refresh(token: string, refreshOptions?: { verify: VerifyOptions }) {
    const payload = verify(token, this.public, refreshOptions?.verify) as Record<string, unknown>;
    delete payload.iat;
    delete payload.exp;
    delete payload.nbf;
    delete payload.jti;
    delete payload.aud;
    // The first signing converted all needed options into claims, they are already in the payload
    return { accessToken: sign(payload, this.secret), expires: this._expiry() };
  }
}

export const JsonWebToken = new Jwt();
