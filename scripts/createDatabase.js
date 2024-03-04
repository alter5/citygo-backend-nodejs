const pgPromise = require("pg-promise")
const config = require("../utils/config.js")
const csvParser = require("csv-parser")
const fs = require("fs")
const logger = require("../utils/logger.js")

const run = async () => {
  let dbConfig = { ...config.DATABASE_CONFIG, database: "postgres" }

  // Configure DB connection
  const pgp = pgPromise({})
  let dbClient = pgp(dbConfig)

  // Test connection to the database
  await testDBConnection(dbClient)

  // Create the city_go and dummy databases
  await createDatabases(dbClient)

  // Close the pool, since we will be connecting to our newly created database
  await dbClient.$pool.end()

  // Connect to new CityGo database
  const databaseName = config.DATABASE_CONFIG.database
  dbConfig = { ...dbConfig, database: databaseName }
  dbClient = pgp(dbConfig)

  // Create cities table
  await dbClient.none(getQueryFromFile("createTableCities"))
  await insertCitiesIntoCitiesTable(dbClient)

  // Create trips table
  await dbClient.none(getQueryFromFile("createTableTrips"))

  // Close the unneeded pool
  await dbClient.$pool.end()
}

const getQueryFromFile = (queryName) => {
  const filePath = "./scripts/queries/" + queryName + ".sql"
  return fs.readFileSync(filePath, "utf8")
}

const getDataFromCsvFile = async (fileName) => {
  const result = []
  const filePath = "./scripts/data/" + fileName + ".csv"
  let triggered = false
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser({ separator: "," }))
      .on("data", (row) => {
        result.push(row)
      })
      .on("end", () => {
        resolve(result)
      })
      .on("error", (error) => {
        reject("Error: " + error.message)
      })
  })
}

const testDBConnection = async (dbClient) => {
  const connection = await dbClient.connect()
  logger.info("Connected to DB successfully")
  connection.done()
}

const createDatabases = async (dbClient) => {
  // Create CityGo database
  const databaseName = config.DATABASE_CONFIG.database
  await dbClient.none("DROP DATABASE IF EXISTS $1~", [databaseName])
  await dbClient.none("CREATE DATABASE $1~", [databaseName])
}

const insertCitiesIntoCitiesTable = async (dbClient) => {
  const pgp = dbClient.$config.pgp

  const cities = await getDataFromCsvFile("cities")
  const cs = new pgp.helpers.ColumnSet(
    ["city_name", "state", "population", "latitude", "longitude"],
    { table: "cities" }
  )

  const insert = pgp.helpers.insert(cities, cs)

  await dbClient.none(insert)
}

module.exports = { run }
