const dbClient = require("./utils/dbClient")

const globalTeardown = async () => {
  // Drop the test database
  await dbClient.dropDatabase()

  // Close all connections to the db
  // This will close only the pool created when importing the dbClient in this module
  // Note: test suites are responsible for closing pools they create when importing the dbClient module
  await dbClient.closeConnections()
}

module.exports = globalTeardown
