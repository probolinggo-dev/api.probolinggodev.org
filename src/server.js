const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const R = require('ramda');
const rfs = require('rotating-file-stream');
const logDir = path.join(process.cwd(), 'logs');
const {dbname, secretKey, unsplashClientId, workers} = require('../config');
const routes = require('./routes');
const isDevelopment = process.env.NODE_ENV === 'development' ? true : false;


const Unsplash = require('./models/unsplash');
const axios = require('axios');

// ensure log directory exists
fs.existsSync(logDir) || fs.mkdirSync(logDir);

// create a rotating write stream
const accessLogStream = rfs('access.log', {
  interval: '7d', // rotate weekly
  path: logDir,
});

app.use(cors());
/* set secret key */
app.set('secretKey', secretKey);
/* connect into database */
mongoose.connect(`mongodb://localhost/${dbname}`);

/* middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  isDevelopment
    ? morgan('dev')
    : morgan('combined', {stream: accessLogStream})
);

/* routing */
app.use(routes);

/* unsplash worker */
const unsplashWorker = () => {
  const getOrientation = (width, height) => {
    if (width === height) return 'square';
    if (width > height) return 'lanscape';
    if (width < height) return 'portrait';
  };
  let page = 3;
  setInterval(async () => {
    try {
      const url = `https://api.unsplash.com/photos/curated?client_id=${unsplashClientId}&per_page=30&page=${page}`;
      const response = await axios.get(url);
      const data = response.data;
      data.forEach(item => {
        Unsplash.findOne({unsplash_id: item.id}, (err, images) => {
          if (err) return;
          if (R.isEmpty(images) || !images) {
            const payload = Object.assign({}, item, {
              orientation: getOrientation(item.width, item.height),
              unsplash_id: item.id,
              photographer: item.user,
            });
            const image = new Unsplash(payload);

            image.save((errsave) => {
              if (errsave) return;

              return;
            });
          }

          return;
        });
      });
      page = page + 1;
    } catch (err) {
      page = 1;
    }
  }, 80000);
};
/* eof unsplash worker */
if (R.or(workers.unsplash, false)) unsplashWorker();

module.exports = app;
