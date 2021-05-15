import bodyParser from 'body-parser';
import express from 'express';
import authHandler from '../../api/auth';
import refreshHandler from '../../api/refresh-token';

const app = express();
app.use(bodyParser.json());

// Login
app.all('/', authHandler as any);

// Refresh Token
app.all('/refresh-token', refreshHandler as any);

export default app;
