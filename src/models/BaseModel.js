const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const paginate = require('mongoose-paginate');
const random = require('mongoose-random');

class Model {
  constructor(options) {
    const {schema, name} = options;
    this.schema = mongoose.Schema(schema);
    this.schema.plugin(timestamp);
    this.schema.plugin(paginate);
    this.schema.plugin(random, {path: 'r'});
    this.name = name;
  }

  create() {
    return mongoose.model(this.name, this.schema);
  }
}

module.exports = Model;
