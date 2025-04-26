// Update with your config settings.

const connection = process.env.DATABASE_URL
? {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  }
: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    }
  };

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: connection,
  staging: connection,
  production: connection,
}