const request = require("supertest")
const app = require("../app")

describe("Test controller cities.js", () => {
  it("should get cities which match query ", async () => {
    const response = await request(app).get("/api/cities/test")

    expect(response.status).toBe(200)
    expect(response.header["content-type"]).toContain("application/json")
    expect(response.body.result).toEqual("Success")
  })
})
