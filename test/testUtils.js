const dbClient = require('../utils/dbClient')

const tearDown = async () => {
  await dbClient.closeConnections()
}

module.exports = { tearDown }
