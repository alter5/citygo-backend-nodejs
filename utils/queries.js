const dbClient = require("./dbClient")
const config = require("./config")

const searchForCities = async (queryString) => {
  const sql = `
  SELECT city_name FROM cities
  WHERE city_name like $1
  `
  const response = {}
  try {
    const _cities = await dbClient.any(sql, [`%${queryString}%`])
    const cities = _cities.map((row) => row.city_name)
    response.result = cities
  } catch (error) {
    response.error = error
  }
  return response
}

const dropDatabase = async () => {

}

module.exports = { searchForCities, dropDatabase }
