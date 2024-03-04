const { dbClient } = require("./dbClient")
const logger = require("../utils/logger")
const config = require("./config")

// Use the VSCode extension "Comment tagged templates" to add intellisense to SQL queries

const searchForCities = async (queryString) => {
  const sql = /* SQL */ `
    SELECT * FROM cities
    WHERE city_name ILIKE $1
    ORDER BY population desc
  `

  // Add wildcard operators
  queryString = "%" + queryString + "%"
  const cities = await dbClient.any(sql, [queryString])

  return createSuccessfulResponse(cities)
}

const getMostPopulousCities = async () => {
  const sql = /* SQL */ `
    SELECT * FROM cities
    ORDER BY population desc
    LIMIT 10
  `

  const cities = await dbClient.many(sql)

  return createSuccessfulResponse(cities)
}

const getCityById = async (cityId) => {
  const sql = /* SQL */ `
    SELECT * FROM cities
    WHERE id = $[cityId]
  `
  const city = await dbClient.oneOrNone(sql, { cityId })

  return createSuccessfulResponse(city)
}

const addTrip = async (trip) => {
  const sql = /* SQL */ `
    INSERT INTO trips (city_id, title, destinations, description, price_range, duration)
    VALUES ($[city_id], $[title], $[destinations], $[description], $[price_range], $[duration]);
  `

  try {
    const { city_id, title, destinations, description, price_range, duration } =
      trip

    await dbClient.none(sql, {
      city_id,
      title,
      destinations,
      description,
      price_range,
      duration
    })
    return createSuccessfulResponse()
  } catch (error) {
    return createErrorResponse("Error creating trip", error)
  }
}

const getTripsByCityId = async (city_id) => {
  const sql = /* SQL */ `
    SELECT *
    FROM trips
    WHERE city_id = $[city_id]
  `

  try {
    const records = await dbClient.any(sql, { city_id })
    return createSuccessfulResponse(records)
  } catch (error) {
    return createErrorResponse("Error retrieving trips by id", error)
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

  return { success: false, errorMessage, exception }
}

module.exports = {
  searchForCities,
  getMostPopulousCities,
  getCityById,
  addTrip,
  getTripsByCityId
}
