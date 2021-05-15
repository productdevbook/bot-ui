import bodyParser from 'body-parser';
import express from 'express';
import refreshHandler from '~/api/refresh-token';
import authHandler from '~/api/auth';

const app = express();
app.use(bodyParser.json());

// Login
app.all('/', authHandler);

// Refresh Token
app.all('/refresh-token', refreshHandler);

export default app;
