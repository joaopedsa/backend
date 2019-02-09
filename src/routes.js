const express = require('express')
const tweetController = require('./controllers/tweetController')
const likeController = require('./controllers/likeController')

const routes = express.Router();

routes.get('/tweets', tweetController.index);
routes.post('/tweets', tweetController.store);

routes.post('/like/:id', likeController.store);

module.exports = routes