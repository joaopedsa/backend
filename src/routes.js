const express = require('express')
const tweetController = require('./controllers/tweetController')
const likeController = require('./controllers/likeController')
const userController = require('./controllers/userController')
const authentication = require('./middlewares/auth');


const routes = express.Router();

routes.post('/login', userController.login);

routes.post('/register',userController.store);

//Abaixo do middleware de authentication é necessario de um token de acesso
routes.use(authentication);

routes.get('/user', userController.user);

routes.get('/tweets', tweetController.index);
routes.post('/tweets', tweetController.store);

routes.post('/like/:id', likeController.store);


module.exports = routes