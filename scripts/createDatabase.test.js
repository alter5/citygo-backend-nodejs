const createDatabase = require("./createDatabase")
const dbClient = require("../utils/dbClient")
const queries = require("../utils/queries")
const config = require("../utils/config")

const run = async () => {
  describe("Script createDatabase.js", () => {
    it("connection to the database is successful", async () => {
      // Do this: SELECT datname FROM pg_catalog.pg_database WHERE datname='$database
      let isConnectedSuccessfully = false
      try {
        const connection = await dbClient.connect()
        connection.done()
        isConnectedSuccessfully = true
      } catch (err) {
        isConnectedSuccessfully = false
        console.log("Connection error", err.stack)
      }
      expect(isConnectedSuccessfully).toBe(true)
    })

    it("should have inserted rows into the cities table", async () => {
      const cityName = "New York"
      const row = await dbClient.one(
        "SELECT * FROM cities WHERE city_name = $1",
        [cityName]
      )
      expect(row.city_name).toEqual(cityName)
    })
  })
}

module.exports = { run }
