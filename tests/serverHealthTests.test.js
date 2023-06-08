// Import controller tests
const createDatabaseTests = require("../scripts/createDatabase.test")
const citiesTests = require("../controllers/cities.test")
const queriesTests = require("../utils/queries.test")

const run = () => {
  // Tests are executed in the order they are defined in the file
  // Note: Test files are executed in parallel, but the tests defined in them are executed synchronously
  // Note: If the test suite is too slow, use test.concurrent to execute tests in parallel

  // Script tests
  // Note: The createDatabase script must have already been executed
  describe("Scripts", () => {
    createDatabaseTests.run()
  })

  // Controller tests
  describe("Controllers", () => {
    citiesTests.run()
  })

  // Utility tests
  describe("Utilities", () => {
    queriesTests.run()
  })
}

module.exports = { run }
