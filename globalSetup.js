const createDatabaseScript = require("./scripts/createDatabase")

const globalSetup = async () => {
  // Creates the database used for testing. The test_ prefix is used for the db name.
  await createDatabaseScript.run()
}

module.exports = globalSetup
