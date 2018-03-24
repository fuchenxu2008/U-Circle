const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = Schema({
  title: String,
  body: String,
  created_at: Date,
  questioner: { type: Schema.Types.ObjectId, ref: 'User' },
  answer: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  type: String,
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
