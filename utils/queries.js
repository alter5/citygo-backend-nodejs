const { dbClient } = require("./dbClient")
const logger = require("../utils/logger")
const config = require("./config")

const searchForCities = async (queryString) => {
  const sql = `
  SELECT * FROM cities
  WHERE city_name like $1
  `
  const response = {}
  try {
    const _cities = await dbClient.any(sql, [`%${queryString}%`])
    console.log("🚀 ~ file: queries.js:13 ~ searchForCities ~ _cities:", _cities)
    const cities = _cities.map((row) => row.city_name)
    response.result = cities
    logger.info("dog", "hi", {dog: {type: "german shepherd"}}, 3)
  } catch (error) {
    response.error = error
  }
  return response
}

const dropDatabase = async () => {

}

module.exports = { searchForCities, dropDatabase }
