// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// config
const config = require('./config');

// DB Setup
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.connect(config.db);

autoIncrement.initialize(connection);

// Models initialization
require('./src/person/person.model');


// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');


const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);