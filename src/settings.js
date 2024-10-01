/**
 * @typedef {object} Settings
 * @property {object} database
 * @property {string} database.connectionString
 */
import 'dotenv/config';

const get = () => {
  return {
    redmine: {
      url: process.env.REDMINE_URL,
      apiKey: process.env.REDMINE_API_KEY
    },
    http: {
      port: process.env.HTTP_PORT || 9500
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
