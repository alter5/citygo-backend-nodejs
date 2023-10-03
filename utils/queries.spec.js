const queries = require("./queries")
const logger = require("./logger")

describe("Helper queries.js", () => {
  it("should get cities which match query string", async () => {
    const response = await queries.searchForCities("New Yo")
    const resultCities = response.result
    console.log(
      "🚀 ~ file: queries.test.js:8 ~ it ~ resultCities:",
      response
    )

    expect(resultCities).toEqual(
      expect.arrayContaining(["West New York", "New York"])
    )
  })
})
