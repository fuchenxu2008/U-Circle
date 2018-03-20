const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  email: String,
  nickname: String,
  password: String,
  role: String,
  question: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
