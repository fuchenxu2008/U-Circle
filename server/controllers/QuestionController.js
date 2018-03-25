/* eslint consistent-return:0 */

const Question = require('../models/Question');
const moment = require('moment');

module.exports = {
  getQuestions: (req, res) => {
    Question.find({}).populate('questioner', ['nickname', 'avatar', 'role']).exec((err, questions) => {
      if (err) return res.status(400).json({ message: 'Unknown error occured!' });
      if (!questions) return res.status(404).json({ message: 'No question found!' });
      return res.send(questions);
    });
  },
  getQuestion: (req, res) => {
    Question.findById(req.params.id).populate('questioner', ['nickname', 'avatar', 'role']).exec((err, question) => {
      if (err) return res.status(400).json({ message: 'Unknown error occured!' });
      if (!question) return res.status(404).json({ message: 'No question found!' });
      return res.send(question);
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
          if (err2) return res.status(400).json({ message: 'Unknown error occured!' });
          return res.send({ question, message: 'Post created!' });
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
        return res.send({ question, message: 'Post updated!' });
      }
    );
  },
  deleteQuestion: (req, res) => {
    Question.findByIdAndRemove(req.body.id,
      (err, question) => {
        if (err) return res.status(400).json({ message: 'Unknown error occured!' });
        if (!question) return res.status(404).json({ message: 'Question not found!' });
        return res.send({ question, message: 'Post deleted!' });
      }
    );
  },
};
