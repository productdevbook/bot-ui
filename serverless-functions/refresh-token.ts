import { JsonWebToken } from '../utils/jwt';

// Refresh JWT
export default (headers: any) => {
  try {
    const token = headers.authorization?.split(' ');
    if (!token) throw new Error('No JWT token found.');
    return JsonWebToken.refresh(token[1], {
      verify: {
        audience: JsonWebToken.options.audience,
        issuer: JsonWebToken.options.issuer
      }
    });
  } catch (e) {
    console.log(e);
  }
  return false;
};
