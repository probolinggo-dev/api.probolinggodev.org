const Model = require('./BaseModel');
const {Schema} = require('mongoose');
const UserMetaModel = new Model({
  name: 'UserMeta',
  schema: {
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true},
    profilePicture: {type: String},
  }
});

module.exports = UserMetaModel.create();
