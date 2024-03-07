const queries = require("./queries")
const testUtils = require("../test/testUtils")
const { dbClient } = require("./dbClient")

describe("Helper queries.js", () => {
  afterAll(async () => {
    await testUtils.tearDownSuite()
  })

  it("should retrieve cities matching the specified query string", async () => {
    await dbClient.tx(async (transaction) => {
      const searchString = "New Yo"
      const response = await queries.searchForCities(searchString, transaction)

      expect(response.success).toBe(true)
      expect(response.data.length).toBeGreaterThan(0)

      const recordNewYork = response.data.find(
        (city) => city.city_name === "New York"
      )
      const recordWestNewYork = response.data.find(
        (city) => city.city_name === "West New York"
      )

      expect(recordNewYork.city_name).toBe("New York")
      expect(recordWestNewYork.city_name).toBe("West New York")

      await queries.rollbackTransaction(transaction)
    })
  })

  it("should retrieve a city by its id", async () => {
    await dbClient.tx(async (transaction) => {
      const searchString = "New Yo"

      const responseSearchCities = await queries.searchForCities(
        searchString,
        transaction
      )

      expect(responseSearchCities.success).toBe(true)
      expect(responseSearchCities.data.length).toBeGreaterThan(0)

      const cityId = responseSearchCities.data[0].id

      const responseGetCityById = await queries.getCityById(cityId, transaction)

      expect(responseGetCityById.data).toEqual(responseSearchCities.data[0])

      await queries.rollbackTransaction(transaction)
    })
  })

  it("should return null if no city is found when searching by ID", async () => {
    await dbClient.tx(async (transaction) => {
      const response = await queries.getCityById(99999999, transaction)
      expect(response.success).toBe(true)
      expect(response.data).toBe(null)

      await queries.rollbackTransaction(transaction)
    })
  })

  it("should insert a city", async () => {
    await dbClient.tx(async (transaction) => {
      const cityId = (await queries.searchForCities("Las Vegas", transaction)).data[0].id

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

      const responseAddTrip = await queries.addTrip(cityCreationDto, transaction)

      expect(responseAddTrip.success).toBe(true)

      const responseGetTrip = await queries.getTripsByCityId(cityId, transaction)

      expect(responseGetTrip.success).toBe(true)
      expect(responseGetTrip.data.length).toBeGreaterThan(0)
      expect(responseGetTrip.data[0].title).toBe(cityCreationDto.title)

      console.log("🚀 ~ awaitdbClient.tx ~ responseGetTrip.data[0].destinations[0].name:", responseGetTrip.data[0].destinations[0].name)

      console.log("🚀 ~ awaitdbClient.tx ~ cityCreationDto.destinations[0]:", cityCreationDto.destinations[0])
      expect(responseGetTrip.data[0].destinations[0].name).toBe(cityCreationDto.destinations[0])

      await queries.rollbackTransaction(transaction)
    })
  })

  it("should return an error when creating a trip for a non-existent city", async () => {
    await dbClient.tx(async (transaction) => {
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

      expect(responseAddTrip.success).toBe(false)

      const responseGetTrip = await queries.getTripsByCityId(cityId)

      expect(responseGetTrip.success).toEqual(true)
      expect(responseGetTrip.data.length).toEqual(0)

      await queries.rollbackTransaction(transaction)
    })
  })

  it("should retrieve most popular trips", async () => {
    await dbClient.tx(async (transaction) => {
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
      expect(response.success).toBe(true)
      expect(response.data.length).toBeGreaterThan(0)
      expect(response.data[0].title).toBe(cityCreationDto.title)

      await queries.rollbackTransaction(transaction)
    })
  })
})
