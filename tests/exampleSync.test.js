const { pgp, dbClient } = require("../utils/dbClient")
const config = require("../utils/config")
const queries = require("../utils/queries")

// Import controller tests
// TODO: Add module.exports to test files
const createDatabaseTests = require("../scripts/createDatabase.test")
const citiesTests = require("../controllers/cities.test")
const queriesTests = require("../utils/queries.test")

beforeAll(() => {
})

afterAll(async () => {
  // Drop the test database
  await queries.dropDatabase()
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
