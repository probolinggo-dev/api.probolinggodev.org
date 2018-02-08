const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('hello'));

module.exports = app;
