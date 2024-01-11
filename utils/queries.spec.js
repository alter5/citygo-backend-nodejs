const queries = require("./queries")
const logger = require("./logger")
const testUtils = require("../test/testUtils")

describe("Helper queries.js", () => {
  afterAll(async () => {
    await testUtils.tearDownSuite()
  })

  it("should retrieve cities matching the specified query string", async () => {
    const searchString = "New Yo"
    const response = await queries.searchForCities(searchString)
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

  it("should retrieve a city by its ID", async () => {
    const searchString = "New Yo"

    let response = await queries.searchForCities(searchString)
    const resultCities = response.data

    const firstCity = resultCities[0]

    response = await queries.getCityById(firstCity.id)
    const firstCityRetrievedById = response.data

    expect(firstCityRetrievedById).toEqual(firstCity)
  })

  it("should return null if no city is found when searching by ID", async () => {
    const response = await queries.getCityById(99999999)
    expect(response.data).toBe(null)
  })
})
