const pgPromise = require("pg-promise")
const config = require("../utils/config")
const citiesRouter = require("express").Router()

const pgp = pgPromise({})

citiesRouter.get("/test", async (request, response) => {
  response.json({ result: "Success" })
})

citiesRouter.get("/search", async (request, response) => {
  let dbClient = pgp(dbConfig)

  try {
    await dbClient.connect()

    console.log("Connected")
  } catch (err) {
    console.log("Connection error", err.stack)
  }

  let res = {}

  const databaseName = "CityGo"

  await dbClient.none("DROP DATABASE IF EXISTS $1~", [databaseName])

  request.response.json({ result: "Success" })
})

module.exports = citiesRouter
