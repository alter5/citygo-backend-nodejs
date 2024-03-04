const pgPromise = require("pg-promise")
const tripsRouter = require("express").Router()
const { dbConfig } = require("../utils/dbClient")
const queries = require("../utils/queries")

tripsRouter.get("/search", async (request, response) => {
  // const queryString = request.query.queryString
  // const result = await queries.searchForCities(queryString)

  // response.json(result)
  
})

module.exports = tripsRouter
