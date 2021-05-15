import { VercelRequest, VercelResponse } from '@vercel/node';
import serverlessRefreshToken from '../serverless-functions/refresh-token';

// Refresh JWT
export default ({ headers }: VercelRequest, res: VercelResponse) => {
  const accessToken = serverlessRefreshToken(headers);
  if (accessToken) {
    return res.status(200).json({ accessToken });
  }
  const response = { message: 'Could not refresh JWT.' };
  return res.status(404).send(response);
};
