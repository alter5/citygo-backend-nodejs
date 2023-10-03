/**
 * This test script checks if the server functions correctly during its entire lifecycle.
 * It tests the creation of the database environment, as well as the functionality of utility and controller modules
 */

const serverHealthTests = require("./serverHealthTests.test")
const createDatabaseScript = require("../scripts/createDatabase")
const database = require("../utils/dbClient")

// TODO: Replace this test script with E2E test cases. Then, allow each unit test module to execute without a test controller (i.e. delete the serverHealthTests module)

beforeAll(async () => {
  // Initialize the database
  await createDatabaseScript.run()
})

afterAll(async () => {
  // Drop the database
  await database.dropDatabase()

  // Close all database connections. This prevents the program from hanging when exiting.
  database.closeConnections()
})

describe("Server lifecycle tests", () => {
  // Check if the server is functioning correctly
  serverHealthTests.run()
})
