const express = require("express")
const cors = require("cors")

require('express-async-errors') // Calls next(err) automatically for async errors

// Import utilities
const middleware = require("./utils/middleware")

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
