const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const paginate = require('mongoose-paginate');

class Model {
  constructor(options) {
    const {schema, name} = options;
    this.schema = mongoose.Schema(schema);
    this.schema.plugin(timestamp);
    this.schema.plugin(paginate);
    this.name = name;
  }

  create() {
    return mongoose.model(this.name, this.schema);
  }
}

module.exports = Model;
