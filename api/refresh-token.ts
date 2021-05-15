import serverlessRefreshToken from '../serverless-functions/refresh-token';

// Refresh JWT
export default ({ headers }: { headers: Record<string, string> }, res: any) => {
  const accessToken = serverlessRefreshToken(headers);
  const vercelEnv = typeof res.status !== 'undefined';
  if (accessToken) {
    if (vercelEnv) return res.status(200).json({ accessToken });
    return res.succeed({ statusCode: '200', body: JSON.stringify({ accessToken }) });
  }
  const response = { message: 'Could not refresh JWT.' };
  if (vercelEnv) return res.status(404).send(response);
  return res.fail({ statusCode: '404', body: JSON.stringify({ message: 'Could not refresh JWT.' }) });
};
