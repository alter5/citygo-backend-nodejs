const dbClient = require('../utils/dbClient')

const tearDownSuite = async () => {
  await dbClient.closeConnections()
}

module.exports = { tearDownSuite }
