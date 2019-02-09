const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://joaopedsa:jp19971302@cluster0-ou6vs.gcp.mongodb.net/goweek?retryWrites=true',{useNewUrlParser: true})
.then(console.log('Conectou'))
.catch(err => console.log(err))

app.use((req,res,next) => {
    req.io = io;
    
    return next();
})
app.use(cors())
app.use(express.json());
app.use(require('../src/routes'));

server.listen(3000, () => {
    console.log('Server Started on port 3000')
});