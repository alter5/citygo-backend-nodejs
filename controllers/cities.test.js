const request = require("supertest")
const app = require("../app")
const queries = require("../utils/queries")

jest.mock("../utils/queries")

const run = () => {
  describe("Controller cities.js", () => {
    it("should return cities from the queries utility module", async () => {
      const expectedResponse = { result: ["New York", "West New York"] }

      queries.searchForCities.mockResolvedValue(expectedResponse)

      const response = await request(app)
        .get("/api/cities/search")
        .query({ queryString: "Lorem ipsum" })

      expect(response.status).toBe(200)
      expect(response.header["content-type"]).toContain("application/json")
      expect(response.body.result).toEqual(
        expect.arrayContaining(expectedResponse.result)
      )
    })
  })
}

module.exports = { run }
