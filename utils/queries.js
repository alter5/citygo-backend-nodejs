const { dbClient } = require("./dbClient")
const logger = require("../utils/logger")
const config = require("./config")

const searchForCities = async (queryString) => {
  const sql = `
  SELECT * FROM cities
  WHERE city_name like $1
  ORDER BY population desc
  `
  const response = {}
  try {
    const cities = await dbClient.any(sql, [`%${queryString}%`])
    // const cities = _cities.map((row) => row.city_name)
    console.log("🚀 ~ file: queries.js:14 ~ searchForCities ~ _cities:", cities)
    response.result = cities
  } catch (error) {
    response.error = error
  }
  return response
}

const dropDatabase = async () => {

}

module.exports = { searchForCities, dropDatabase }
