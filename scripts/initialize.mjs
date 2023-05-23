import pg from "pg"
const { Client } = pg
import config from "../utils/config.js"

const dbConfig = config.DATABASE_CONFIG

const dbClient = new Client(dbConfig)

// Connect to Postgre DB
try {
  await dbClient.connect()
  console.log('connected')
} catch (err) {
  console.log('connection error', err.stack)
}

const res = await dbClient.query('SELECT $1::text as message', ['Hello dog!'])
console.log(res) // Hello world!
await dbClient.end()


export { }

