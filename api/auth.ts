import { Handler } from 'aws-lambda';
import serverlessAuth from '../serverless-functions/auth';

const handler: Handler = async (event) => {
  const accessToken = await serverlessAuth(event.body);
  if (accessToken) {
    return {
      statusCode: 200,
      body: { accessToken }
    };
  }
  const response = { message: 'Authentication failed.' };
  return {
    statusCode: 401,
    body: response
  };
};

export default handler;
