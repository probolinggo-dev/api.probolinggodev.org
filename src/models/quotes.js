const Model = require('./BaseModel');
const {Schema} = require('mongoose');
const QuoteModel = new Model({
  schema: {
    content: {type: String},
    author: {type: String},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
  },
  name: 'Quote'
});

module.exports = QuoteModel.create();
