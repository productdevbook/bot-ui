import app from './index';

// on Heroku if trying to serve "full-static" site we need to spin up express for the server middleware to work
if (process.env.RENDER_TARGET === 'static') {
  app.listen(process.env.PORT);
}
