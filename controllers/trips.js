const pgPromise = require("pg-promise")
const tripsRouter = require("express").Router()
const { dbConfig } = require("../utils/dbClient")
const queries = require("../utils/queries")

tripsRouter.get("/:tripId", async (request, response) => {
  const tripId = request.params.tripId
  response.json(await queries.getTripById(tripId))
})

tripsRouter.get("/getTripsByCity/:cityId", async (request, response) => {
  const cityId = request.params.cityId
  response.json(await queries.getTripsByCityId(cityId))
})

tripsRouter.post("/createTrip", async (request, response) => {
  const tripDto = request.body.tripDto
  response.json(await queries.addTrip(tripDto))
})

tripsRouter.get("/popularTrips", async (request, response) => {
  response.json(await queries.getMostPopularTrips())
})

module.exports = tripsRouter
