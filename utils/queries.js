const { dbClient } = require("./dbClient")
const logger = require("../utils/logger")
const config = require("./config")

// Use the VSCode extension "Comment tagged templates" to add intellisense to SQL queries

const searchForCities = async (queryString, transactionContext) => {
  const client = getClient(transactionContext)

  const sql = /* SQL */ `
    SELECT * FROM cities
    WHERE city_name ILIKE $1
    ORDER BY population desc
  `

  // Add wildcard operators
  queryString = "%" + queryString + "%"
  const cities = await client.any(sql, [queryString])

  return createSuccessfulResponse(cities)
}

const getMostPopulousCities = async (transactionContext) => {
  const client = getClient(transactionContext)

  const sql = /* SQL */ `
    SELECT * FROM cities
    ORDER BY population desc
    LIMIT 10
  `

  const cities = await client.many(sql)

  return createSuccessfulResponse(cities)
}

const getCityById = async (cityId, transactionContext) => {
  const client = getClient(transactionContext)

  const sql = /* SQL */ `
    SELECT * FROM cities
    WHERE id = $[cityId]
  `
  const city = await client.oneOrNone(sql, { cityId })

  return createSuccessfulResponse(city)
}

const addTrip = async (trip, transactionContext) => {
  const client = getClient(transactionContext)

  const destinationsWithImages = trip.destinations.map((destination) => {
    return { name: destination, imageUrl: "http://image-url.com/" }
  })

  const formattedDestinations = JSON.stringify(destinationsWithImages)

  const sql = /* SQL */ `
    INSERT INTO trips (city_id, title, destinations, description, price_range, duration)
    VALUES ($[city_id], $[title], $[destinations], $[description], $[price_range], $[duration]);
  `

  try {
    const { city_id, title, description, price_range, duration } = trip

    await client.none(sql, {
      city_id,
      title,
      destinations: formattedDestinations,
      description,
      price_range,
      duration
    })
    return createSuccessfulResponse()
  } catch (error) {
    return createErrorResponse("Error creating trip", error)
  }
}

const getTripsByCityId = async (city_id, transactionContext) => {
  const client = getClient(transactionContext)

  const sql = /* SQL */ `
    SELECT *
    FROM trips
    WHERE city_id = $[city_id]
  `

  try {
    const records = await client.any(sql, { city_id })
    return createSuccessfulResponse(records)
  } catch (error) {
    return createErrorResponse("Error retrieving trips by id", error)
  }
}

const getMostPopularTrips = async (transactionContext) => {
  const client = getClient(transactionContext)

  const sql = /* SQL */ `
    SELECT *
    FROM trips
    JOIN cities ON cities.id = trips.id
    LIMIT 10
  `

  try {
    const records = await client.any(sql)
    console.log("🚀 ~ getMostPopularTrips ~ records:", records)
    return createSuccessfulResponse(records)
  } catch (error) {
    createErrorResponse("Error retrieving popular trips", error)
  }
}

const createSuccessfulResponse = (data) => {
  if (data === undefined) {
    data = {}
  }
  return { success: true, data }
}

const createErrorResponse = (errorMessage, exception) => {
  if (errorMessage === undefined) {
    errorMessage = "An error has occurred"
  }
  if (exception === undefined) {
    exception = {}
  }

  console.error(errorMessage, exception)

  const error =
    errorMessage +
    ":\n" +
    JSON.stringify(exception, Object.getOwnPropertyNames(exception))

  return { success: false, error }
}

const getClient = (transactionContext) => {
  if (transactionContext !== undefined) {
    return transactionContext
  }
  return dbClient
}

const rollbackTransaction = async (transactionContext) => {
  // try {
  //   await transactionContext.any("SELECT 1 / 0")
  // } catch (error) {
  //   // The transaction rolls back on error
  // }
  // throw new Error()
}

module.exports = {
  searchForCities,
  getMostPopulousCities,
  getCityById,
  addTrip,
  getTripsByCityId,
  getMostPopularTrips,
  rollbackTransaction
}
