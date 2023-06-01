const express = require("express")
const cors = require("cors")
// TODO: Delete unneeded requires
// require('express-async-errors') // Eliminates try-catch blocks completely with the use of implied next()'s

// Import utilities
const config = require("./utils/config")
const logger = require("./utils/logger")
const middleware = require('./utils/middleware')

// Import controllers
const citiesRouter = require("./controllers/cities.js")

const app = express()

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/cities", citiesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
