import { JsonWebToken } from '../utils/jwt';

// Refresh JWT
export default (req: any, res: any) => {
  try {
    const token = req.headers?.authorization?.split(' ');
    if (!token) throw new Error('No JWT token found.');
    const accessToken = JsonWebToken.refresh(token[1], {
      verify: {
        audience: JsonWebToken.options.audience,
        issuer: JsonWebToken.options.issuer
      }
    });
    return res.status(200).json({ accessToken });
  } catch (e) {
    console.log(e);
    return res.status(404).send({ message: 'Could not refresh JWT. Session terminated.' });
  }
};
