const { Router } = require('express');

const ExampleRouter = require('./example/example.routes');

const routes = Router();

routes.use('/example', ExampleRouter);

module.exports = routes;
