const { dbClient } = require("./dbClient")
const logger = require("../utils/logger")
const config = require("./config")

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
  console.log("🚀 ~ getCityById ~ city:", city)

  return createSuccessfulResponse(city)
}

const createSuccessfulResponse = (data) => {
  return { success: true, data }
}

const createErrorResponse = (error) => {
  return { success: false, error }
}

const addTrip = async (trip) => {
  const sql = /* SQL */ `
  INSERT INTO 
  `
}

module.exports = { searchForCities, getMostPopulousCities, getCityById }
