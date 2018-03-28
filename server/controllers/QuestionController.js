/* eslint consistent-return:0 */

const Question = require('../models/Question');
const Answer = require('../models/Answer');
const moment = require('moment');

module.exports = {
  getQuestions: (req, res) => {
    Question.find({})
    .populate('questioner', ['nickname', 'avatar', 'role'])
    .populate({ path: 'answer', populate: { path: 'answerer', select: ['avatar', 'nickname'] } })
    .exec((err, questions) => {
      if (err) return res.status(400).json({ message: 'Unknown error occured!' });
      if (!questions) return res.status(404).json({ message: 'No question found!' });
      return res.json(questions);
    });
  },

  getQuestion: (req, res) => {
    Question.findById(req.params.id)
    .populate('questioner', ['nickname', 'avatar', 'role'])
    .populate({ path: 'answer', populate: { path: 'answerer', select: ['avatar', 'nickname'] } })
    .exec((err, question) => {
      if (err) return res.status(400).json({ message: 'Unknown error occured!' });
      if (!question) return res.status(404).json({ message: 'No question found!' });
      return res.json(question);
    });
  },

  addQuestion: (req, res) => {
    Question.create(
      {
        title: req.body.title,
        body: req.body.body,
        questioner: req.body.questionerID,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
      (err, newQuestion) => {
        if (err) return res.status(400).json({ message: 'Unknown error occured!' });
        Question.findById(newQuestion._id).populate('questioner', [
          'nickname', 'avatar', 'role',
        ]).exec((err2, question) => {
          if (err2 || !question) return res.status(400).json({ message: 'Unknown error occured!' });
          return res.json({ question, message: 'Post created!' });
        });
      }
    );
  },

  editQuestion: (req, res) => {
    Question.findByIdAndUpdate(req.body.id, {
      title: req.body.title,
      body: req.body.body,
    }, { new: true },
      (err, question) => {
        if (err) return res.status(400).json({ message: 'Unknown error occured!' });
        if (!question) return res.status(404).json({ message: 'Question not found!' });
        return res.json({ question, message: 'Post updated!' });
      }
    );
  },

  deleteQuestion: (req, res) => {
    Question.findByIdAndRemove(req.body.id,
      (err, question) => {
        if (err) return res.status(400).json({ message: 'Unknown error occured!' });
        if (!question) return res.status(404).json({ message: 'Question not found!' });
        return res.json({ question, message: 'Post deleted!' });
      }
    );
  },

  answerQuestion: (req, res) => {
    const { content, answerer } = req.body;
    const { id } = req.params;
    if (!content || !answerer || !id) return res.json({ message: 'Incomplete answer details!' });
    Answer.create({
      content,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      answerer,
      question: id,
    }, (err, answer) => {
      if (err || !answer) return res.json(err);
      Question.findById(id, (err2, oldQuestion) => {
        if (err2 || !oldQuestion) return res.json(err2);
        oldQuestion.set({ answer: oldQuestion.answer.concat(answer._id) });
        oldQuestion.save((err3, updatedQuestion) => {
          if (err3 || !updatedQuestion) return res.json(err3);
          Question.findById(id)
          .populate('questioner', ['nickname', 'avatar', 'role'])
          .populate({ path: 'answer', populate: { path: 'answerer', select: ['avatar', 'nickname'] } })
          .exec((err4, question) => {
            if (err4 || !question) return res.json(err4);
            return res.json({ question, message: 'Answer submitted' });
          });
        });
      });
    });
  },
};
