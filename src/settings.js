/**
 * @typedef {object} Settings
 * @property {object} database
 * @property {string} database.connectionString
 */
import 'dotenv/config';

const get = () => {
  if (!process.env.REDMINE_URL)
    throw new Error('', {
      cause: { code: 'MISSING_ENV', env: 'REDMINE_URL' }
    });

  if (!process.env.REDMINE_API_KEY)
    throw new Error('', {
      cause: { code: 'MISSING_ENV', env: 'REDMINE_API_KEY' }
    });

  if (!process.env.HTTP_PORT)
    throw new Error('', {
      cause: { code: 'MISSING_ENV', env: 'HTTP_PORT' }
    });

  return {
    redmine: {
      url: process.env.REDMINE_URL,
      apiKey: process.env.REDMINE_API_KEY
    },
    http: {
      port: process.env.HTTP_PORT
    }
  };
};

export default { get };
