const { Router } = require('express');
const ExampleController = require('../../app/controllers/example.controller');

const routes = Router();

routes.get('/:number', ExampleController.example);

module.exports = routes;
