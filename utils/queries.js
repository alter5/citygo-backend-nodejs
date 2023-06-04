const { pgp, dbClient } = require("./dbClient")
const config = require("./config")

const searchForCities = async (queryString) => {
  const sql = `
  SELECT city_name FROM cities
  WHERE city_name like $1
  `
  const response = {}
  try {
    const _cities = await dbClient.any(sql, [`%${queryString}%`])
    const cities = _cities.map((row) => row.city_name)
    response.result = cities
  } catch (error) {
    response.error = error
  }
  return response
}

const dropDatabase = async () => {
  // Shut down all connection pools before dropping the database
  // Note: the dbClient.js module will no longer work, since all pools are destroyed
  pgp.end()

  // Switch to the default/postgres database to prevent errors when dropping the city_go database
  const dbConfig = { ...config.DATABASE_CONFIG, database: "postgres" }
  const dbClientPostgres = pgp(dbConfig)

  const databaseName = config.DATABASE_CONFIG.database

  try {
    await dbClientPostgres.none("DROP DATABASE $1~", [databaseName])
  } catch (error) {
    console.log("Error: ", error)
  }

  // Open connection pools prevent the current process from terminating
  // So, shut down all connection pools so that the process can finish
  pgp.end()
}

module.exports = { searchForCities, dropDatabase }
