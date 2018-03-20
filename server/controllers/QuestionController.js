const Question = require('../models/Question');
const moment = require('moment');

module.exports = {
  getQuestions: (req, res) => {
    Question.find({}, (err, questions) => {
      if (err) return res.json({ message: 'Unknown error occured!' });
      if (!questions) return res.json({ message: 'No question found!' });
      return res.send(questions);
    });
  },
  addQuestion: (req, res) => {
    Question.create(
      {
        title: req.body.title,
        body: req.body.body,
        questioner: req.body.questioner,
        created_at: moment().format('YYYY-MM-DD hh:mm:ss'),
      },
      (err, question) => {
        if (err) return res.json({ message: 'Unknown error occured!' });
        return res.send(question);
      }
    );
  },
};
