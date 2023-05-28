import pgPromise from "pg-promise"
import * as config from "../utils/config.mjs"
import * as fs from "fs"
import * as path from "path"

async function run() {
  let dbConfig = config.DATABASE_CONFIG

  // Configure DB connection
  const pgp = pgPromise({})
  let dbClient = pgp(dbConfig)

  // Connect to Postgre DB
  try {
    await dbClient.connect()
    console.log("connected")
  } catch (err) {
    console.log("connection error", err.stack)
  }

  let res = {}

  // Create CityGo database
  await dbClient.none("DROP DATABASE IF EXISTS citygo")
  await dbClient.none("CREATE DATABASE citygo")

  // Connect to new CityGo database
  dbConfig = { ...dbConfig, database: "citygo" }
  dbClient = pgp(dbConfig)

  // Create cities table
  const queryCreateTableCities = getQueryString("createTableCities")
  await dbClient.none(queryCreateTableCities)

}

function getQueryString(queryName) {
  const queryFileDirectory = path.resolve("./scripts/queries/" + queryName + ".sql")
  return fs.readFileSync(queryFileDirectory, "utf8")
}

function getArrayFromCsvFile(fileName) {

}

export default { run }
