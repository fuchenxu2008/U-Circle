const Question = require('../models/Question');

module.exports = {
  searchPeerQuestion: (req, res) => {
    const { type, /* major, */ keyword } = req.query;
    Question.find({
      type,
      // major,
      $or: [{ body: new RegExp(keyword, 'i') }, { title: new RegExp(keyword, 'i') }],
    }, (err, questions) => {
      if (err) return res.send(err);
      return res.send(questions);
    });
  },
};
