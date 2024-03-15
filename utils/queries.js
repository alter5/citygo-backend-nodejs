const { dbClient } = require("./dbClient")
const logger = require("../utils/logger")
const config = require("./config")
const axios = require("axios").default

// Use the VSCode extension "Comment tagged templates" to add intellisense to SQL queries

const searchForCities = async (searchString, transactionContext) => {
  const client = getClient(transactionContext)

  const sql = /* SQL */ `
    SELECT * FROM cities
    WHERE city_name ILIKE $1
    ORDER BY population desc
  `
  try {
    // Add wildcard operators
    searchString = "%" + searchString + "%"
    const records = await client.any(sql, [searchString])
    return createSuccessfulResponse(records)
  } catch (error) {
    return createErrorResponse(
      "Error searching for cities with search string",
      error
    )
  }
}

const getMostPopulousCities = async (transactionContext) => {
  const client = getClient(transactionContext)

  const sql = /* SQL */ `
    SELECT * FROM cities
    ORDER BY population desc
    LIMIT 10
  `

  try {
    const records = await client.many(sql)
    return createSuccessfulResponse(records)
  } catch (error) {
    return createErrorResponse("Error getting most populous cities", error)
  }
}

const getCityById = async (cityId, transactionContext) => {
  const client = getClient(transactionContext)

  const sql = /* SQL */ `
    SELECT * FROM cities
    WHERE id = $[cityId]
  `

  try {
    const records = await client.one(sql, { cityId })
    return createSuccessfulResponse(records)
  } catch (error) {
    return createErrorResponse("Error getting city by id", error)
  }
}

const addTrip = async (tripDto, transactionContext) => {
  const client = getClient(transactionContext)

  addImagesToTrip(tripDto)

  const sql = /* SQL */ `
    INSERT INTO trips (city_id, title, destinations, description, price_range, duration)
    VALUES ($[city_id], $[title], $[destinations], $[description], $[price_range], $[duration])
    RETURNING id;
  `

  try {
    const { city_id, title, destinations, description, price_range, duration } =
      tripDto

    const record = await client.one(sql, {
      city_id,
      title,
      destinations: JSON.stringify(destinations),
      description,
      price_range,
      duration
    })

    return createSuccessfulResponse({ tripId: record.id })
  } catch (error) {
    return createErrorResponse("Error creating trip", error)
  }
}

const addImagesToTrip = async (tripDto) => {
  const responseCity = await getCityById(tripDto.city_id)
  const cityName = responseCity.data.city_name

  const destinationsWithImages = tripDto.destinations.map(
    async (destination) => {
      let imageUrl
      if (config.IS_TESTING_MODE_ENABLED) {
        imageUrl = "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?q=80&w=1217&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      } else {
        imageUrl = await getImageWithSearchString(
          destination.name + ", " + cityName
        )
      }
      return { name: destination, imageUrl }
    }
  )

  tripDto.destinations = destinationsWithImages
}

const getImageWithSearchString = async (searchString) => {
  const apiBaseUrl = "https://api.unsplash.com"
  const searchEndpoint = "/search/photos"
  const accessKey = config.UNSPLASH_ACCESS_KEY

  const response = await axios.get(apiBaseUrl + searchEndpoint, {
    headers: {
      Authorization: "Client-ID " + accessKey
    },
    params: {
      query: searchString
    }
  })

  console.log("🚀 ~ getImageWithSearchString ~ response:", response.data)

  const imageUrl = response.data.results[0].urls.full

  return imageUrl
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
      SELECT t.*, to_json(c.*) city
      FROM trips t
      JOIN cities c ON c.id = t.id
      ORDER BY t.created_at desc
      LIMIT 10
  `

  try {
    const records = await client.any(sql)
    return createSuccessfulResponse(records)
  } catch (error) {
    return createErrorResponse("Error retrieving popular trips", error)
  }
}

const getTripById = async (tripId, transactionContext) => {
  const client = getClient(transactionContext)

  const sql = /* SQL */ `
    SELECT t.*, to_json(c.*) city
    FROM trips t
    JOIN cities c ON c.id = t.id
    WHERE t.id = $[tripId]
  `

  try {
    const record = await client.oneOrNone(sql, { tripId })
    return createSuccessfulResponse(record)
  } catch (error) {
    return createErrorResponse("Error getting trip by id", error)
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
}

module.exports = {
  searchForCities,
  getMostPopulousCities,
  getCityById,
  addTrip,
  getTripsByCityId,
  getMostPopularTrips,
  rollbackTransaction,
  getTripById,
  getImageWithSearchString
}
