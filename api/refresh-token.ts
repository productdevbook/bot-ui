import { Handler } from 'aws-lambda';
import serverlessRefreshToken from '../serverless-functions/refresh-token';

// Refresh JWT
const handler: Handler = async ({ headers }) => {
  const accessToken = await serverlessRefreshToken(headers);
  if (accessToken) {
    return {
      statusCode: 200,
      body: { accessToken }
    };
  }
  const response = { message: 'Could not refresh JWT.' };
  return {
    statusCode: 404,
    body: response
  };
};

export default handler;
