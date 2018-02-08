const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {type: String, unique: true},
  username: {type: String, unique: true},
  name: String,
  password: String,
});

module.exports = mongoose.model('User', userSchema);
