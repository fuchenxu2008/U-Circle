const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = Schema({
  title: String,
  body: String,
  created_at: Date,
  questioner: { type: Schema.Types.ObjectId, ref: 'User' },
  images: Array,
  answer: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  bestAnswer: { type: Schema.Types.ObjectId, ref: 'Answer' },
  type: String,
  major: String,
  subscribers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
