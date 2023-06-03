const request = require("supertest")
const app = require("../app")

const run = () => {
  describe("Controller cities.js", () => {
    it("should get cities which match query string", async () => {
      const response = await request(app)
        .get("/api/cities/search")
        .query({ queryString: "New Yo" })

      expect(response.status).toBe(200)
      expect(response.header["content-type"]).toContain("application/json")
      expect(response.body.result).toEqual(
        expect.arrayContaining(["New York", "West New York"])
      )
    })
  })
}

module.exports = { run }
