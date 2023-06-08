/**
 * This test script checks if the server functions correctly during its entire lifecycle.
 * It tests the creation of the database environment, as well as the functionality of utility and controller modules
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
