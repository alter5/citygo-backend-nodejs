const pgPromise = require("pg-promise")
const config = require("../utils/config.js")
const csvParser = require("csv-parser")
const fs = require("fs")

async function run() {
  let dbConfig = { ...config.DATABASE_CONFIG, database: "postgres" }

  // Configure DB connection
  const pgp = pgPromise({})
  let dbClient = pgp(dbConfig)

  // Connect to Postgre DB
  try {
    await dbClient.connect()
    console.log("Connected")
  } catch (err) {
    console.log("Connection error", err.stack)
  }

  let res = {}

  const databaseName = "city_go"

  // Create CityGo database
  await dbClient.none("DROP DATABASE IF EXISTS $1~", [databaseName])
  await dbClient.none("CREATE DATABASE $1~", [databaseName])

  // Connect to new CityGo database
  dbConfig = { ...dbConfig, database: databaseName }
  dbClient = pgp(dbConfig)

  // Create cities table
  const queryCreateTableCities = getQueryFromFile("createTableCities")
  await dbClient.none(queryCreateTableCities)

  const cities = await getDataFromCsvFile("cities")

  const cs = new pgp.helpers.ColumnSet(
    ["city_name", "state", "population", "latitude", "longitude"],
    { table: "cities" }
  )

  const insert = pgp.helpers.insert(cities, cs)

  await dbClient.none(insert)

  // Terminate the process, since the db client continues to run in the background if not terminated
  process.exit(1)
}

function getQueryFromFile(queryName) {
  const filePath = "./scripts/queries/" + queryName + ".sql"
  return fs.readFileSync(filePath, "utf8")
}

async function getDataFromCsvFile(fileName) {
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

module.exports = { run }
