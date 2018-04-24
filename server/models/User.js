const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  email: { type: String, unique: true, lowercase: true },
  nickname: String,
  password: String,
  role: String,
  avatar: String,
  credit: Number,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
