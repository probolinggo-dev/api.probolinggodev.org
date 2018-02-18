const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const {dbname, secretKey} = require('../config');

// import routes
const routes = require('./routes');

app.set('secretKey', secretKey);

/* connect into database */
mongoose.connect(`mongodb://localhost/${dbname}`);

/* middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

/* routing */
app.use(routes);

module.exports = app;
