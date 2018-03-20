const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = Schema({
  content: String,
  created_at: Date,
  answerer: { type: Schema.Types.ObjectId, ref: 'User' },
  question: { type: Schema.Types.ObjectId, ref: 'Question' },
});

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;
