const express = require('express');
const cors = require('cors');
const Youch = require('youch');

const routes = require('./routes');
const morganBody = require('morgan-body');
const helmet = require('helmet');

class App {
	constructor() {
		this.app = express();

		this.middlewares();
		this.routes();
		this.exceptionHandler();
	}

	middlewares() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(helmet());
		morganBody(this.app, {
			prettify: true,
			logRequestBody: false,
			logResponseBody: false,
		});
	}

	routes() {
		this.app.use('/', routes);
	}

	exceptionHandler() {
		this.app.use(async (err, request, response, next) => {
			const errors = await new Youch(err, request).toJSON();
			return response.status(500).json(errors);
		});
	}
}

module.exports = new App().app;
