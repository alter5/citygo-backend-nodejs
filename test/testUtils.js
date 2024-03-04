const dbClient = require('../utils/dbClient')

/**
 * Used to tear down everything created in a suite.
 * For example, it closes the connection pool created by importing the queries module
 */
const tearDownSuite = async () => {
  await dbClient.closeConnections()
}

module.exports = { tearDownSuite }
