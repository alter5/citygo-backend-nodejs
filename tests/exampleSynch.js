// const dbClient = require("../utils/dbClient")

// // Import controller tests
// // TODO: Add module.exports to test files
// const citiesTests = require("../controllers/cities.test")
// const queriesTests = require("../controllers/queries.test")


// afterAll(() => {
//   // Disconnect from database after completing all test cases
//   dbClient.$pool.end
// })

// // Tests are executed in the order they are defined in the file
// // Note: test files are executed in parallel, but the tests defined in them are executed synchronously

// // Controller tests
// describe('Controller cities.js', citiesTests)

// // If the test suite is too slow, use test.concurrent to execute tests in parallel
// test.concurrent("Controller queries.js", queriesTests)
