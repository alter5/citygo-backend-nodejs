const request = require("supertest")

const app = require("../app")

describe("Utility middleware.js", () => {
  it("should catch errors and return a json object with the error's message", async () => {
    const errorMessage = "An unhandled error has occurred"

    const response = await request(app).get("/api/cities/error")

    expect(response.status).toBe(500)
    expect(response.header["content-type"]).toContain("application/json")
    expect(response.body.error).toContain(errorMessage)
  })
})
