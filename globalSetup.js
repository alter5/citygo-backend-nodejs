const createDatabaseScript = require("./scripts/createDatabase")

const globalSetup = async () => {
  // Creates the database used for testing.
  // During testing, a prefix of test_ is added to the application's database
  await createDatabaseScript.run()
}

module.exports = globalSetup
