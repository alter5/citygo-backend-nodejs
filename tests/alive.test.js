// TODO: Create test case checking if the json object is returned from cities
// Use the supertest library
const request = require('supertest');
const app = require('../app');

describe('General server tests', () => {
  it('should respond with \"Success\"', async () => {
    const response = await request(app).get('/api/cities/test');

    expect(response.status).toBe(200);
    expect(response.header['content-type']).toContain('application/json');
    expect(response.body.result).toEqual("Success");
  });
});
