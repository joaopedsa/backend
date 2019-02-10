const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-ou6vs.gcp.mongodb.net/${process.env.DB_NAME}?retryWrites=true`,{useNewUrlParser: true})
.then(console.log('Conectou'))
.catch(err => console.log(err))

app.use((req,res,next) => {
    req.io = io;
    
    return next();
})
app.use(cors())
app.use(express.json());
app.use(require('./routes'));

server.listen(8000 , () => {
    console.log('Server Started on port 8000')
});