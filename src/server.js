const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const logDir = path.join(process.cwd(), 'logs');
const {dbname, secretKey} = require('../config');
const routes = require('./routes');
const isDevelopment = process.env.NODE_ENV === 'development' ? true : false;

// ensure log directory exists
fs.existsSync(logDir) || fs.mkdirSync(logDir);

// create a rotating write stream
const accessLogStream = rfs('access.log', {
  interval: '7d', // rotate weekly
  path: logDir,
});

/* set secret key */
app.set('secretKey', secretKey);
/* connect into database */
mongoose.connect(`mongodb://localhost/${dbname}`);

/* middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  isDevelopment
    ? morgan('dev')
    : morgan(':id :method :url :response-time', {stream: accessLogStream})
);

/* routing */
app.use(routes);

module.exports = app;
