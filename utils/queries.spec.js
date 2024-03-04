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

  it("should retrieve a city by its id", async () => {
    const searchString = "New Yo"

    const responseSearchCities = await queries.searchForCities(searchString)

    expect(responseSearchCities.success).toEqual(true)
    expect(responseSearchCities.data.length).toBeGreaterThan(0)

    const cityId = responseSearchCities.data[0].id

    const responseGetCityById = await queries.getCityById(cityId)

    expect(responseGetCityById.data).toEqual(responseSearchCities.data[0])
  })

  it("should return null if no city is found when searching by ID", async () => {
    const response = await queries.getCityById(99999999)
    expect(response.success).toEqual(true)
    expect(response.data).toBe(null)
  })

  it("should insert a city", async () => {
    const cityId = (await queries.searchForCities("Las Vegas")).data[0].id

    expect(cityId).toBeGreaterThan(0)

    const cityCreationDto = {
      city_id: cityId,
      title: "Trip to Las Vegas",
      destinations: [
        "The Strip",
        "Fremont Street Experience",
        "Red Rock Canyon"
      ],
      description: "Experience the excitement and entertainment of Las Vegas",
      priceRange: 4,
      duration: 3
    }

    const responseAddTrip = await queries.addTrip(cityCreationDto)

    expect(responseAddTrip.success).toEqual(true)

    const responseGetTrip = await queries.getTripsByCityId(cityId)

    expect(responseGetTrip.success).toEqual(true)
    expect(responseGetTrip.data.length).toBeGreaterThan(0)
    expect(responseGetTrip.data[0].title).toBe(cityCreationDto.title)
  })

  it("should return an error when creating a trip for a non-existent city", async () => {
    const cityId = 99999

    const cityCreationDto = {
      city_id: cityId,
      title: "Trip to Las Vegas",
      destinations: [
        "The Strip",
        "Fremont Street Experience",
        "Red Rock Canyon"
      ],
      description: "Experience the excitement and entertainment of Las Vegas",
      priceRange: 4,
      duration: 3
    }

    const responseAddTrip = await queries.addTrip(cityCreationDto)

    expect(responseAddTrip.success).toEqual(false)

    const responseGetTrip = await queries.getTripsByCityId(cityId)

    expect(responseGetTrip.success).toEqual(true)
    expect(responseGetTrip.data.length).toEqual(0)
  })
})
