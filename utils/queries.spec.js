const queries = require("./queries")
const logger = require("./logger")
const testUtils = require("../test/testUtils")

describe("Helper queries.js", () => {
  afterAll(async () => {
    await testUtils.tearDownSuite()
  })

  it("should get cities which match query string", async () => {
    const response = await queries.searchForCities("New Yo")
    const resultCities = response.result
    console.log("🚀 ~ file: queries.spec.js:13 ~ it ~ resultCities:", resultCities)

    expect
    expect(resultCities).toEqual(
      expect.arrayContaining([
        expect.objectContaining({city_name: "New York", state: "New York", population: 8405837})]),
        expect.objectContaining({city_name: "West Ne York", state: "New Jersey", population: 2122})
    )
  })
})
