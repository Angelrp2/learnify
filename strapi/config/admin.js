'use strict';

module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'learnify-admin-secret-change-in-production'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'learnify-api-token-salt-change-in-production'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'learnify-transfer-token-salt'),
    },
  },
});
