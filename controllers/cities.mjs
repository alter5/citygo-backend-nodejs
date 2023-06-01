import config from '../utils/config'
import express from "express"

const citiesRouter = express.Router()

citiesRouter.get("/test", async (request, response) => {
    response.json({result: "Success"})
})

citiesRouter.get("/search", async (request, response) => {
  
  response.json({result: "Success"})
})

export default citiesRouter
