const Question = require('../models/Question');

module.exports = {
  searchQuestion: (req, res) => {
    const { type } = req.query;
    let { major, keyword } = req.query;
    major = major.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    keyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const searchTerm = { type };
    if (major !== '') searchTerm.major = new RegExp(major, 'i');
    if (keyword !== '') searchTerm.$or = [{ body: new RegExp(keyword, 'i') }, { title: new RegExp(keyword, 'i') }];
    Question.find(searchTerm, (err, questions) => {
      if (err) return res.send(err);
      return res.send(questions);
    });
  },
};
