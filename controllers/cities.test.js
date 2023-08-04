const request = require("supertest")
const app = require("../app")
const queries = require("../utils/queries")

jest.mock("../utils/queries")

const run = () => {
  describe("Controller cities.js", () => {
    afterAll(() => {
      // TODO: Fix unmocking. The mock still persists!
      jest.unmock("../utils/queries")
      jest.resetModules()
    })

    beforeEach(() => {
      jest.resetAllMocks()
    })

    it("should return cities from the queries utility module", async () => {
      const mockResponse = { result: ["Manchester", "Liverpool"] }

      queries.searchForCities.mockResolvedValueOnce(mockResponse)

      const response = await request(app)
        .get("/api/cities/search")
        .query({ queryString: "Lorem ipsum" })

      expect(response.status).toBe(200)
      expect(response.header["content-type"]).toContain("application/json")
      expect(response.body.result).toEqual(
        expect.arrayContaining(mockResponse.result)
      )
    })
  })
}

module.exports = { run }
