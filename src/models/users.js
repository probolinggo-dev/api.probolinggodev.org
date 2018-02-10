const Model = require('./BaseModel');
const UserModel = new Model({
  schema: {
    email: {type: String, unique: true, required: true},
    username: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    tokenValidation: {type: String, required: true},
    isValidated: {type: Boolean, default: false}
  },
  name: 'User'
});

module.exports = UserModel.create();
