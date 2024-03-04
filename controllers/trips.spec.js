const request = require("supertest")
const app = require("../app")
const queries = require("../utils/queries")
const testUtils = require("../test/testUtils")

jest.mock("../utils/queries")

describe("Controller cities.js", () => {
  const url = "/api/trips"

  afterAll(async () => {
    // Close the connection pool created by importing the queries module
    await testUtils.tearDownSuite()
  })

  it("should create a trip using dto", async () => {
    const mockResponse = { success: true, data: {} }

    queries.addTrip.mockResolvedValueOnce(mockResponse)

    const response = await request(app)
    .post(url + "/createTrip")
    .send({ tripDto: { title: "Title 1" } })


    console.log("🚀 ~ it ~ response:", response)

    expect(response.status).toBe(200)
    expect(response.header["content-type"]).toContain("application/json")
    expect(response.body.success).toEqual(true)
  })

  it("should retrieve all trips for a city", async () => {
    const mockResponse = {
      success: true,
      data: [{ title: "Short trip in Manchester" }, { title: "Tour Liverpool" }]
    }

    queries.getTripsByCityId.mockResolvedValueOnce(mockResponse)

    const city_id = 999

    const response = await request(app)
      .get(url + "/getTripsByCity/" + city_id)

    expect(response.status).toBe(200)
    expect(response.header["content-type"]).toContain("application/json")
    expect(response.body.success).toEqual(true)
    expect(response.body.data.length).toBeGreaterThan(0)
    expect(response.body.data[0].title).toEqual("Short trip in Manchester")

    //
  })
})
