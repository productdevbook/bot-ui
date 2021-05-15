import { VercelRequest, VercelResponse } from '@vercel/node';
import serverlessAuth from '../serverless-functions/auth';

export default async (req: VercelRequest, res: VercelResponse) => {
  const accessToken = await serverlessAuth(req.body);
  if (accessToken) {
    return res.status(200).json({ accessToken });
  }
  const response = { message: 'Authentication failed.' };
  return res.status(401).send(response);
};
