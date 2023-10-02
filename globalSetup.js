const createDatabaseScript = require("./scripts/createDatabase")

const globalSetup = async () => {
  // TODO: Create the test database, and insert cities into tables
  // Creates the database used for testing. The test_ prefix is used for the db name.
  await createDatabaseScript.run()
}

module.exports = globalSetup
