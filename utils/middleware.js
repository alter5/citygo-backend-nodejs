const logger = require("./logger")

const requestLogger = (request, response, next) => {
  logger.info("Request received")
  logger.info("Method: ", request.method)
  logger.info("Path:   ", request.path)
  logger.info("Body:   ", request.body)
  logger.info("Query:  ", request.query)
  logger.info("----------")
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
  const errorMessage = "An unhandled error has occurred: \n" + error.stack
  logger.error(errorMessage)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  } else {
    return response.status(error.status || 500).send({ error: errorMessage })
  }
  // Alternatively, you can use next() to use Express's built-in error handler.
  // This built-in handler is added to the end of the middleware function stack, and can be triggered by calling next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
