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

const createSuccessfulResponse = (data) => {
  return { success: true, data }
}

const createErrorResponse = (error) => {
  return { success: false, error }
}

module.exports = { searchForCities, getMostPopulousCities }
