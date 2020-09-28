const axios = require('axios');

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.API_URL,
    });
  }
}

module.exports = new ApiService().api;
