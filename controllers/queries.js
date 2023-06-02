const dbClient = require("../utils/dbClient")

const searchForCity = async (queryString) => {
  const sql = `
  SELECT city_name FROM cities
  WHERE city_name like $1
  `
  const response = {}
  try {
    const cities = await dbClient.any(sql, [`%${queryString}%`])
    response.result = cities
  } catch (error) {
    response.error = error
  }
  return response
}

module.exports = { searchForCity }
