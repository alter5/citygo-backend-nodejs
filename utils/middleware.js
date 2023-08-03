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
  let errorMessage = ""

  const errorIntro = "An unhandled error has occurred:"
  const errorTitle = error.message || "No error title was specified"
  const errorStack = error.stack

  errorMessage = errorIntro + "\n" + errorTitle + "\n" + errorStack

  logger.error(errorMessage)
  return response.status(error.status || 500).send({ error: errorMessage })

  // Alternatively, you can use next() to use Express's built-in error handler.
  // This built-in handler is added to the end of the middleware function stack, and can be triggered by calling next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
