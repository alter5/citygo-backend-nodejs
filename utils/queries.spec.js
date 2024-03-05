const queries = require("./queries")
const testUtils = require("../test/testUtils")
const { dbClient } = require("./dbClient")

describe("Helper queries.js", () => {
  afterAll(async () => {
    await testUtils.tearDownSuite()
  })

  it("should retrieve cities matching the specified query string", async () => {
    dbClient.tx(async (transaction) => {
      const searchString = "New Yo"
      const response = await queries.searchForCities(searchString, transaction)
      const resultCities = response.data

      const foundNewYork = resultCities.find(
        (city) => city.city_name === "New York"
      )
      const foundWestNewYork = resultCities.find(
        (city) => city.city_name === "West New York"
      )

      expect(foundNewYork).toEqual(true)
      expect(foundWestNewYork).toEqual(true)

      queries.rollbackTransaction(transaction)
    })
  })

  it("should retrieve a city by its id", async () => {
    dbClient.tx(async (transaction) => {
      const searchString = "New Yo"

      const responseSearchCities = await queries.searchForCities(
        searchString,
        transaction
      )

      expect(responseSearchCities.success).toEqual(true)
      expect(responseSearchCities.data.length).toBeGreaterThan(0)

      const cityId = responseSearchCities.data[0].id

      const responseGetCityById = await queries.getCityById(cityId, transaction)

      expect(responseGetCityById.data).toEqual(responseSearchCities.data[0])

      queries.rollbackTransaction(transaction)
    })
  })

  it("should return null if no city is found when searching by ID", async () => {
    dbClient.tx(async (transaction) => {
      const response = await queries.getCityById(99999999, transaction)
      expect(response.success).toEqual(true)
      expect(response.data).toBe(null)

      queries.rollbackTransaction(transaction)
    })
  })

  it("should insert a city", async () => {
    dbClient.tx(async (transaction) => {
      const cityId = (await queries.searchForCities("Las Vegas")).data[0].id

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

      queries.rollbackTransaction(transaction)
    })
  })

  it("should return an error when creating a trip for a non-existent city", async () => {
    dbClient.tx(async (transaction) => {
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

      queries.rollbackTransaction(transaction)
    })
  })

  it("should retrieve most popular trips", async () => {
    dbClient.tx(async (transaction) => {
      const cityId = (await queries.searchForCities("Las Vegas")).data[0].id

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

      await queries.addTrip(cityCreationDto)

      const response = await queries.getMostPopularTrips(transaction)
      expect(response.success).toEqual(true)
      expect(response.data.length).toBeGreaterThan(0)
      expect(response.data[0].title).toBe(cityCreationDto.title)

      queries.rollbackTransaction(transaction)
    })
  })
})
