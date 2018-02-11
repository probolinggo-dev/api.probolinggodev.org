const express = require('express');
const bodyParser = require('body-parser');
const app = express();
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

app.get('/', (req, res) => res.send('hello'));

/* routing */
app.use(routes);

module.exports = app;
