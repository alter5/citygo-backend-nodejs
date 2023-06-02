import { signuptests } from './signup'

const dbClient = require("../utils/dbClient")

beforeAll(() => {
  dbClient.$pool.end
})

test.concurrent("Controller ")

describe('Signup', signuptests)
describe('Login', logintests)
