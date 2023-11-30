const queries = require("./queries")
const logger = require("./logger")
const testUtils = require("../test/testUtils")

describe("Helper queries.js", () => {
  afterAll(async () => {
    await testUtils.tearDownSuite()
  })

  it("should get cities which match query string", async () => {
    const response = await queries.searchForCities("New Yo")
    const resultCities = response.data

    expect(resultCities[0]).toMatchObject({
      city_name: "New York",
      state: "New York",
      population: 8405837
    })
    expect(resultCities[1]).toMatchObject({
      city_name: "West New York",
      state: "New Jersey",
      population: 52122
    })
  })
})
