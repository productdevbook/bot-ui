import serverlessAuth from '../serverless-functions/auth';

export default async ({ body }: { body: string }, res: any) => {
  const accessToken = await serverlessAuth(body);
  const vercelEnv = typeof res.status !== 'undefined';
  if (accessToken) {
    if (vercelEnv) return res.status(200).json({ accessToken });
    return res.succeed({ statusCode: '200', body: JSON.stringify({ accessToken }) });
  }
  const response = { message: 'Authentication failed.' };
  if (vercelEnv) return res.status(401).send(response);
  return res.fail({ statusCode: '401', body: JSON.stringify(response) });
};
