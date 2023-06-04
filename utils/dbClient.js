const pgPromise = require("pg-promise")
const config = require("./config.js")

const dbConfig = config.DATABASE_CONFIG

// Configure DB connection
const pgp = pgPromise({})
const dbClient = pgp(dbConfig)

module.exports = { pgp, dbClient }
