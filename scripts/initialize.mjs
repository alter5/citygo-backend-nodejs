import pg from "pg"
const { Client } = pg
import config from "../utils/config.js"

const dbConfig = config.DATABASE_CONFIG

const dbClient = new Client(dbConfig)

dbClient
  .connect()
  .then(() => console.log('connected'))
  .catch((err) => console.error('connection error', err.stack))
await dbClient.connect()

// Example config from pg documentation
// const config = {
//   host: 'my.database-server.com',
//   port: 5334,
//   database: 'database-name',
//   user: 'database-user',
//   password: 'secretpassword!!',
// }

const res = await dbClient.query('SELECT $1::text as message', ['Hello world!'])
console.log(res.rows[0].message) // Hello world!
await dbClient.end()


export { }

