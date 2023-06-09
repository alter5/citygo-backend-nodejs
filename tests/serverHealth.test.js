const serverHealthTests = require("./serverHealthTests.test")
const dbClient = require("../utils/dbClient")

afterAll(() => {
  // Close all connections so that the process can terminate
  disconnectFromDatabase()
})

describe("Server health tests", () => {
  // Check if the server is functioning correctly
  // E.g., do the controller routes return the expected JSON responses?
  serverHealthTests.run()
})

const disconnectFromDatabase = () => {
  // Get pgp module from database client
  const pgp = dbClient.$config.pgp

  // Close all connection pools
  pgp.end()
}
