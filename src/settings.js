/**
 * @typedef {object} Settings
 * @property {object} database
 * @property {string} database.connectionString
 */
import 'dotenv/config';

const get = () => {
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
    },
    gitlab: {
      access_token: process.env.GITLAB_ACCESS_TOKEN,
      url: process.env.GITLAB_URL
    },
    github: {
      access_token: process.env.GITHUB_ACCESS_TOKEN,
      url: process.env.GITHUB_URL
    }
  };
};

export default { get };
