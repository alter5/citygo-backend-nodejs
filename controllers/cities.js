const config = require('../utils/config')
const citiesRouter = require("express").Router()

citiesRouter.get("/test", async (request, response) => {
    response.json({result: "Success"})
})

module.exports = citiesRouter
