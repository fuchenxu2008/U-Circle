const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrivateQuestionSchema = Schema({
  title: String,
  body: String,
  created_at: Date,
  questioner: { type: Schema.Types.ObjectId, ref: 'User' },
  alumniToAsk: { type: Schema.Types.ObjectId, ref: 'User' },
  images: Array,
  answer: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  solved: Boolean,
  major: String,
});

const PrivateQuestion = mongoose.model('PrivateQuestion', PrivateQuestionSchema);

module.exports = PrivateQuestion;
