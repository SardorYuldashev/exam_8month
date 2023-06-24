const config = require('../shared/config');
const knex = require('knex');

const db = knex({
  client: 'postgresql',
  connection: {
    database: config.db.name,
    user:    config.db.user,
    password: config.db.password,
    port: config.db.port
  },
  pool: {
    min: 2,
    max: 10
  }
});

module.exports = db;