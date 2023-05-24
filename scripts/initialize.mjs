import * as pg from "pg"
import config from "../utils/config.js"
import * as fs from "fs"

const dbConfig = config.DATABASE_CONFIG
console.log("🚀 ~ file: initialize.mjs:6 ~ dbConfig:", dbConfig)

const dbClient = new pg.Client(dbConfig)

// Connect to Postgre DB
try {
  await dbClient.connect()
  console.log("connected")
} catch (err) {
  console.log("connection error", err.stack)
}

console.log("🚀 ~ file: initialize.mjs:15 ~ console:", console)

// create function to get query from file
// await dbClient.query("CREATE USER $1 WITH SUPERUSER PASSWORD $2", config.DATABASE_USER, config.DATABASE_PASSWORD)
await dbClient.query("DROP DATABASE IF EXISTS CityGo")
dbClient.database = "CityGo"

queryCreateTableCities = getQueryString("createTableCities")

// dbClient.query(queryCreateTableCities, )

// dbClient.query("CREATE TABLE ")

const res = await dbClient.query("SELECT $1::text as message", ["Hello dog!"])
console.log(res) // Hello world!
await dbClient.end()

function getQueryString(queryName) {
  return fs.readFileSync("queries/" + queryName + ".sql", "utf8")
}

function getArrayFromCsvFile(fileName) {
  
}

export {}
