const Model = require('./BaseModel');

const CuratedUrlsModel = new Model({
  name: 'curatedUrls',
  schema: {
    url: {type: String},
    description: {type: String},
  }
});

module.exports = CuratedUrlsModel.create();
