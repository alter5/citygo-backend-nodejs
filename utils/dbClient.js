const pgPromise = require("pg-promise")
const config = require("./config.js")
const logger = require("../utils/logger")

const dbConfig = config.DATABASE_CONFIG

// Configure DB connection
const pgp = pgPromise({query: e => {
  console.log('QUERY:', e.query);
}})

/**
 * This database client is used to execute queries on the main database
 */
const dbClient = pgp(dbConfig)

/**
 * This database client is connected to the "postgres" database.
 * This client is useful when the CityGo database is unaccessible, or certain commands cannot be executed on it.
 */
const defaultPostgresDbClient = pgp({...dbConfig, database: "postgres"})

/**
 * Drops the CityGo database using the PostgreSQL drop command. Useful for when recreating the database from scratch.
 */
const dropDatabase = async () => {
  // TODO: Confirm that this function is working correctly
  // Terminate just the CityGo database pool, and not the Postgres database one
  module.exports.dbClient.$pool.end()

  const databaseName = config.DATABASE_CONFIG.database
  try {
    await module.exports.defaultPostgresDbClient.none("DROP DATABASE $1~", [databaseName])
  } catch (error) {
    logger.info("Error dropping the database: ", error)
    throw error
  }

  // Reassign a new pg-promise client to the dbClient export property
  // The old client is obsolete from dropping the db
  module.exports.dbClient = pgp(dbConfig)
}

/**
 * Closes all the db connections. This prevents the current thread from being unable to exit.
 *
 * Note: the clients provided in this module's exports will no longer work after this is executed.
 */
const closeConnections = () => {
  pgp.end()
}

module.exports = { dbClient, defaultPostgresDbClient, dropDatabase, closeConnections }
