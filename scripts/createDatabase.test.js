const createDatabase = require("./createDatabase")
const dbClient = require("../utils/dbClient")
const queries = require("../utils/queries")

const run = async () => {
  describe("Script createDatabase.js", () => {
    it("should be able to connect to database test_city_go", async () => {
      let isConnectedSuccessfully = false
      try {
        (await dbClient.connect()).done()
        isConnectedSuccessfully = true
      } catch (err) {
        isConnectedSuccessfully = false
        console.log("Connection error", err.stack)
        isConnectedSuccessfully = false
      }
      expect(isConnectedSuccessfully).toBe(true)
    })
  })

  
}

module.exports = { run }
