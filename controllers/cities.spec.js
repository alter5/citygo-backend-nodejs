const request = require("supertest")
const app = require("../app")
const queries = require("../utils/queries")
const testUtils = require("../test/testUtils")

jest.mock("../utils/queries")

describe("Controller cities.js", () => {
  afterAll(async () => {
    await testUtils.tearDownSuite()
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
