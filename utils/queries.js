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
  changeToDefaultDatabase()

  const databaseName = config.DATABASE_CONFIG.database
  await dbClient.none("DROP DATABASE $1~", [databaseName])

  changeToEnvironmentDatabase()
}

const changeToDefaultDatabase = async () => {
  const defaultDatabase = "postgres"
  dbClient.$cn.database = defaultDatabase
}

const changeToEnvironmentDatabase = () => {
  const environmentDatabase = config.DATABASE_CONFIG.database
  dbClient.$cn.database = environmentDatabase
}

module.exports = { searchForCities, dropDatabase }
