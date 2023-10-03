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

    expect(resultCities).toEqual(
      expect.arrayContaining(["West New York", "New York"])
    )
  })
})
