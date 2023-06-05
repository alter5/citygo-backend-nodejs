const pgPromise = require("pg-promise")
const config = require("../utils/config.js")
const csvParser = require("csv-parser")
const fs = require("fs")

const run = async () => {
  // Note: The utils/dbClient.js module will no longer work if it has already been loaded/required, since all connection pools will be destroyed

  // Shut down all connection pools before dropping the database
  const pgp = pgPromise({})
  pgp.end()

  // Switch to the dummy database to prevent errors when dropping the city_go database
  const dbConfig = { ...config.DATABASE_CONFIG, database: "dummy" }
  const dbClient = pgp(dbConfig)

  const databaseName = config.DATABASE_CONFIG.database
  try {
    await dbClient.none("DROP DATABASE $1~", [databaseName])
  } catch (error) {
    console.log("Error: ", error)
  }

  // Open connection pools will prevent the current process from terminating
  // So, the connection pools should be shutdown for the process to finish
  pgp.end()
}

module.exports = { run }
