const request = require("supertest")

const app = require("../app")

const run = () => {
  describe("Utility middleware.js", () => {
    // TODO: Mock the endpoint so that it returns an error instead
    it("should catch errors and return a json object with the error's message", async () => {
      const errorMessage = "An error has occurred in the cities controller module"
      const expectedResponse = { error: errorMessage }
      
      const response = await request(app).get("/api/cities/error")

      expect(response.status).toBe(500)
      expect(response.header["content-type"]).toContain("application/json")
      expect(response.body).toEqual(expect.objectContaining(expectedResponse))
    })
  })
}

module.exports = { run }
