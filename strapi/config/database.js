'use strict';
const path = require('path');

module.exports = ({ env }) => {
  const databaseUrl = env('DATABASE_URL', '');

  if (databaseUrl) {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: databaseUrl,
          ssl: { rejectUnauthorized: false },
        },
        acquireConnectionTimeout: 60000,
      },
    };
  }

  return {
    connection: {
      client: 'sqlite',
      connection: { filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')) },
      useNullAsDefault: true,
    },
  };
};
