require("dotenv").config() // Variables stored in the .env file

// const MONGODB_URI = process.env.NODE_ENV === 'test'
//     ? process.env.TEST_MONGODB_URI
//     : process.env.MONGODB_URI

const PORT = process.env.PORT

const DATABASE_USER = process.env.DATABASE_USER
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
const DATABASE_HOST = process.env.DATABASE_HOST

const DATABASE_CONFIG = {
  USER: DATABASE_USER,
  PASSWORD: DATABASE_PASSWORD,
  HOST: DATABASE_HOST
}

// const SECRET = process.env.SECRET

module.exports = {
  PORT,
  DATABASE_CONFIG
}
