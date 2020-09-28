// we will use supertest to test HTTP requests/responses
const request = require('supertest');
// we also need our app for the correct routes!
const app = require('../../../app');

describe('getPerson', () => {
  test('Buscar Pessoa', async () => {
    const response = await request(app).get('/');
    console.log(response);
    expect(response.statusCode).toBe(200);
  });
});
