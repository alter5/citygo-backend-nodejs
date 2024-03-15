const dotenv = require("dotenv") // Variables stored in the .env file

dotenv.config()

// Flag checking if the npm test script was executed
const IS_TESTING_MODE_ENABLED = process.env.NODE_ENV === "test"
let testPrefixString = ""
if (IS_TESTING_MODE_ENABLED) {
  testPrefixString = "test_"
}

const PORT = process.env.PORT

const DATABASE_HOST = process.env.DATABASE_HOST
const DATABASE_PORT = process.env.DATABASE_PORT
const DATABASE_NAME = testPrefixString + process.env.DATABASE_NAME
const DATABASE_USER = process.env.DATABASE_USER
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD

const DATABASE_CONFIG = {
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  database: DATABASE_NAME,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  sslmode: "prefer",
  connect_timeout: 10
}

// Restrict the max number of connections in a pool during testing
/*
  Jest test suites run concurrently on individual threads (# of threads = max number of threads available on the PC, minus one)
  Each test suite/ thread has its own module registry, and creates its own connection pool when importing the dbClient module
  Thus, the total number of connections is (# of concurrent threads) * (max connection pool size)
*/
if (IS_TESTING_MODE_ENABLED) {
  DATABASE_CONFIG.max = 3
}

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY

const GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_KEY

module.exports = {
  IS_TESTING_MODE_ENABLED,
  PORT,
  DATABASE_CONFIG,
  UNSPLASH_ACCESS_KEY,
  GOOGLE_MAPS_KEY
}
