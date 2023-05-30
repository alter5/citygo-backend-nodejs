import pgPromise from "pg-promise"
import config from "../utils/config.mjs"
import csvParser from "csv-parser"
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

  const databaseName = "CityGo"

  // Create CityGo database
  await dbClient.none("DROP DATABASE IF EXISTS $1~", [databaseName])
  await dbClient.none("CREATE DATABASE $1~", [databaseName])

  // Connect to new CityGo database
  dbConfig = { ...dbConfig, database: databaseName }
  dbClient = pgp(dbConfig)

  // Create cities table
  const queryCreateTableCities = getQueryFromFile("createTableCities")
  await dbClient.none(queryCreateTableCities)

  // Terminate the process, since the db client continues to run in the background if not terminated
  process.exit(1)
}

function getQueryFromFile(queryName) {
  const filePath = "./scripts/queries/" + queryName + ".sql"
  return fs.readFileSync(filePath, "utf8")
}

// function getArrayFromCsvFile(fileName) {
//   const result = []
//   const filePath = path.resolve("./scripts/queries/" + queryName + ".sql")
//   fs.createReadStream(filename)
//     .pipe(parse({ delimiter: ',' }))
//     .on('data', (r) => {
//       console.log(r);
//       result.push(r);
//     })
//     .on('end', () => {
//       console.log(result);
//     })
// }

export default { run }
