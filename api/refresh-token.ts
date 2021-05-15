import fs from 'fs';
import path from 'path';
import { Jwt } from '../server-middleware/auth/jwt';

// Refresh JWT
const secretKey = process.env.RS256_SECRET_KEY;
const publicKey = fs.readFileSync(path.join(__dirname, '/../../public.key.pub'), 'utf8');
if (!secretKey || !publicKey) throw new Error('Public/Secret key is undefined.');
const jwt = new Jwt(secretKey, publicKey);
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
