import { Jwt } from '../server-middleware/auth/jwt';

// Refresh JWT
const jwt = new Jwt();
export default (req: any, res: any) => {
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
};
