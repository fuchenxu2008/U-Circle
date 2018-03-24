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
  addQuestion: (req, res) => {
    Question.create(
      {
        title: req.body.title,
        body: req.body.body,
        questioner: req.body.questionerID,
        created_at: moment().format('YYYY-MM-DD hh:mm:ss'),
      },
      (err, question) => {
        if (err) return res.status(400).json({ message: 'Unknown error occured!' });
        return res.send({ question, message: 'Post created!' });
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
