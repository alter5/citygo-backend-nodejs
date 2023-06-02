const queries = require("./queries")

describe("Helper queries.js", () => {
  it("should get cities which match query string", async () => {
    const response = await queries.searchForCities("New Yo")
    const resultCities = response.result

    expect(resultCities).toEqual(
      expect.arrayContaining(["West New York", "New York"])
    )
  })
})

