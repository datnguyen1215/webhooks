import express from 'express';
import http from 'http';
import routes from './routes';
import settings from '@src/settings';
import logging from '@src/logging';

const logger = logging.create('http.server');

const config = settings.get();
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('*', (req, _res, next) => {
  logger.info(
    `${req.method} ${req.originalUrl} ${JSON.stringify(req.body)} ${JSON.stringify(req.query)}`
  );
  next();
});
app.use('/webhooks', routes.webhooks());

// catchall error handler in case an error is thrown in the request pipeline
app.use((err, _req, res, _next) => {
  logger.error(JSON.stringify(err.cause) || err);

  if (err.cause?.status) res = res.status(err.cause.status);

  res.json({ error: { message: err.message, ...err.cause } });
});

/**
 * Start the HTTP server based on configuration from the environment.
 * @returns {Promise<void>}
 */
const start = async () => {
  return new Promise((resolve, reject) => {
    server.listen(config.http.port, err => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
};

/**
 * Stop the HTTP server.
 * @returns {Promise<void>}
 */
const stop = async () => {
  return new Promise((resolve, reject) => {
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
};

export default { start, stop };
