import pgPromise from "pg-promise"
import config from "../utils/config.js"
import * as fs from "fs"
import * as path from "path"

let dbConfig = config.DATABASE_CONFIG
console.log("🚀 ~ file: initialize.mjs:6 ~ dbConfig:", dbConfig)

// Configure DB connection
const pgp = pgPromise({})
let dbClient = pgp(dbConfig)

// Connect to Postgre DB
try {
  await dbClient.connect()
  console.log("connected")
} catch (err) {
  console.log("connection error", err.stack)
}

let res = {}
res = await dbClient.query(`
select usesysid as user_id,
       usename as username,
       usesuper as is_superuser,
       passwd as password_md5,
       valuntil as password_expiration
from pg_shadow
order by usename;
`)
console.log("🚀 ~ file: playground.mjs:31 ~ res:", res)

export {}
