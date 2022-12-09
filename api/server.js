const express = require('express');
const server = express();

const {logger} = require('./middleware/middleware')

server.use(express.json())

const userRoute = require('./users/users-router')

server.use(logger)

server.use('/api/users' , userRoute)
// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
