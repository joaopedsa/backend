const ExampleService = require('../services/example.service');

class ExampleController {
  constructor() {}

  example = async (request, response) => {
    const { number } = request.params;
    try {
      const { data } = await ExampleService.getPerson(number);
      response.status(200).json(data);
    } catch (err) {
      const { status, data } = err.response;
      response.status(status).json(data);
    }
  };
}

module.exports = new ExampleController();
