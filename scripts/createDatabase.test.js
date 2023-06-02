const createDatabase = require("./createDatabase")
const dbClient = require("../utils/dbClient")
const queries = require("../controllers/queries")

beforeAll(() => {
  // Note: crossenv is being used to change the database utilized during testing
  createDatabase.run()
})

describe("Script createDatabase.js", () => {
  it("should create database test_city_go", async () => {
    let isConnectedSuccessfully = false
    try {
      isConnectedSuccessfully = await dbClient.connect()
      console.log(
        "🚀 ~ file: createDatabase.test.js:15 ~ it ~ connectionResponse:",
        connectionResponse
      )
      console.log("Connected")
    } catch (err) {
      isConnectedSuccessfully = false
      console.log("Connection error", err.stack)
    }

    expect(isConnectedSuccessfully).toBe(true)
  })
})
