const api = require('./api.service');

class ExampleService {
  constructor() {}

  async getPerson(number) {
    const response = await api.get(`/people/${number}`);
    return response;
  }
}

module.exports = new ExampleService();
