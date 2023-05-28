import pgPromise from "pg-promise"
import config from "../utils/config.js"
import * as fs from "fs"
import * as path from "path"

async function initialize() {
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

  res = await dbClient.none("DROP DATABASE IF EXISTS citygo")
  res = await dbClient.none("CREATE DATABASE citygo")

  dbConfig = { ...dbConfig, database: "citygo" }
  dbClient = pgp(dbConfig)

  const queryCreateTableCities = getQueryString("createTableCities")
  res = await dbClient.none(queryCreateTableCities)

  // await dbClient.$pool.end
}

function getQueryString(queryName) {
  const queryFileDirectory = path.resolve("./scripts/queries/" + queryName + ".sql")
  return fs.readFileSync(queryFileDirectory, "utf8")
}

function getArrayFromCsvFile(fileName) {

}

export default { initialize }
