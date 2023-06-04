const createDatabase = require("./createDatabase.js")

const run = async () => {
  await createDatabase.run()
  process.exit(1)
}

run()
