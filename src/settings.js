/**
 * @typedef {object} Settings
 * @property {object} database
 * @property {string} database.connectionString
 */
import "dotenv/config";

const get = () => {
  if (!process.env.DATABASE_CONNECTION_STRING) {
    throw new Error("DATABASE_CONNECTION_STRING is not set");
  }

  return {
    database: {
      connectionString: process.env.DATABASE_CONNECTION_STRING
    }
  };
};

const settings = get();

export default settings;
