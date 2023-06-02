const request = require("supertest")
const app = require("../app")
const pgPromise = require("pg-promise")

describe("General server tests", () => {
  it('should respond with "Success"', async () => {
    const response = await request(app).get("/api/cities/test")

    expect(response.status).toBe(200)
    expect(response.header["content-type"]).toContain("application/json")
    expect(response.body.result).toEqual("Success")
  })

  it("should connect to Postgre database", async () => {
    const response = await request(app)
      .get("/api/cities/search")
      .query({ queryString: "New Yo" })

    expect(response.status).toBe(200)
    expect(response.header["content-type"]).toContain("application/json")
    expect(response.body.result).toEqual(
      expect.arrayContaining([
        { city_name: "New York" },
        { city_name: "West New York" }
      ])
    )
  })
})
