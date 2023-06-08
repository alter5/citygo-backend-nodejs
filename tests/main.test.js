/**
 * This test module checks if the server functions correctly during its entire lifecycle.
 * It creates the database environment, and then tests
 */

const serverHealthTests = require("./serverHealthTests.test")
const createDatabaseScript = require("../scripts/createDatabase")
const dropDatabaseScript = require("../scripts/dropDatabase")

beforeAll(async () => {
  // Initialize the database
  await createDatabaseScript.run()
})

afterAll(async () => {
  // Drop the database
  await dropDatabaseScript.run()
})

describe("Server lifecycle tests", () => {
  // Check if the server is functioning correctly
  serverHealthTests.run()
})
