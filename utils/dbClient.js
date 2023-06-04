const pgPromise = require("pg-promise")
const config = require("./config.js")

const dbConfig = config.DATABASE_CONFIG

// Configure DB connection
const pgp = pgPromise({})
const dbClient = pgp(dbConfig)

// Useful for executing queries when the main database does not exist, or is dropped
const dummyDbClient = pgp({...dbConfig, database: "dummy"})

// Note: Do not execute this function unless it is guaranteed no queries are being executed on the server at the time this function is called
const closePools = async () => {
  pgp.end()

  // Switch to the default/postgres database to prevent errors when dropping the city_go database
  const dbConfig = { ...config.DATABASE_CONFIG, database: "postgres" }
  const dbClientPostgres = pgp(dbConfig)

  const databaseName = config.DATABASE_CONFIG.database

    await dbClientPostgres.none("DROP DATABASE $1~", [databaseName])

  // Open connection pools prevent the current process from terminating
  // So, shut down all connection pools so that the process can finish
  pgp.end()

}

module.exports = { pgp, dbClient, dummyDbClient, closePools }
