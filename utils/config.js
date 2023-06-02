const dotenv = require("dotenv") // Variables stored in the .env file

dotenv.config()

const isTestingModeEnabled = process.env.NODE_ENV === "test"
let testingString = ""
if (isTestingModeEnabled) {
  testingString = "test_"
}

const PORT = process.env.PORT

const DATABASE_HOST = process.env.DATABASE_HOST
const DATABASE_PORT = process.env.DATABASE_PORT
const DATABASE_NAME = testingString + process.env.DATABASE_NAME
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

module.exports = {
  PORT,
  DATABASE_CONFIG
}
