const Model = require('./BaseModel');
const {Schema} = require('mongoose');
const UserModel = new Model({
  schema: {
    email: {type: String, unique: true, required: true},
    username: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    tokenValidation: {type: String},
    isValidated: {type: Boolean, default: false},
    quotes: [{type: Schema.Types.ObjectId, ref: 'Quote'}],
    meta: {type: Schema.Types.ObjectId, ref: 'UserMeta'},
  },
  name: 'User'
});

module.exports = UserModel.create();
