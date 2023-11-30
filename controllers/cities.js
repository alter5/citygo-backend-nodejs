const pgPromise = require("pg-promise")
const citiesRouter = require("express").Router()
const { dbConfig } = require("../utils/dbClient")
const queries = require("../utils/queries")

citiesRouter.get("/search", async (request, response) => {
  const queryString = request.query.queryString
  const result = await queries.searchForCities(queryString)

  response.json(result)
})

citiesRouter.get("/mostPopulous", async(request, response) => {
  response.json(await queries.getMostPopulousCities())
})

citiesRouter.get("/test", async (request, response) => {
  response.json({ result: "Success" })
})

citiesRouter.get("/error", async (request, response, next) => {
  throw new Error()
})

module.exports = citiesRouter
