const config = require('../utils/config')
const citiesRouter = require("express").Router()

citiesRouter.get("/", async (request, response) => {

    response.json({result: "hi"})
})

module.exports = citiesRouter
