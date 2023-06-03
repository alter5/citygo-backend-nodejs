const dbClient = require("../utils/dbClient")
const config = require("../utils/config")
const queries = require("../utils/queries")

// Import controller tests
// TODO: Add module.exports to test files
const createDatabaseTests = require("../scripts/createDatabase.test")
const citiesTests = require("../controllers/cities.test")
const queriesTests = require("../utils/queries.test")

beforeAll(() => {
  // Disconnects the database after test cases are complete
  // dbClient.$cn.allowExitOnIdle
})

afterAll(async () => {
  // Drop the test database
  await queries.dropDatabase()

  // Disconnect from database after completing all test cases
  await dbClient.$pool.end()
})

// Tests are executed in the order they are defined in the file
// Note: test files are executed in parallel, but the tests defined in them are executed synchronously

// Script tests
// createDatabase must be executed first to create the testing environment
describe("Scripts", () => {
  createDatabaseTests.run()
  // it("createdb", createDatabaseTests.run)
})

// Controller tests
describe("Controllers", () => {
  citiesTests.run()
})

// Note: If the test suite is too slow, use test.concurrent to execute tests in parallel
// test.concurrent('Controller cities.js', citiesTests)

// Utility tests
describe("Utilities", () => {
  queriesTests.run()
})
