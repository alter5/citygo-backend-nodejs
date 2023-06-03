const queries = require("./queries")

const run = () => {
  describe("Helper queries.js", () => {
    it("should get cities which match query string", async () => {
      const response = await queries.searchForCities("New Yo")
      const resultCities = response.result

      expect(resultCities).toEqual(
        expect.arrayContaining(["West New York", "New York"])
      )
    })
  })
}

module.exports = { run }
