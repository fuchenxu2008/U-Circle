const Answer = require('../models/Answer');
const Question = require('../models/Question');

module.exports = {
  getAnswer: (req, res) => {
    Answer.findById(req.params.id, (err, answer) => {
      if (err) return res.status(400).send(err);
      return res.json(answer);
    });
  },

  deleteAnswer: (req, res) => {
    Answer.findByIdAndRemove(req.params.id, (err, answer) => {
      if (err) {
        console.log(err);
        return res.status(400).send(err);
      }
      if (!answer) {
        return res.status(404).json({ message: 'Answer already deleted.' });
      }
      return Question.findById(answer.question, (err2, question) => {
        if (err2) {
          console.log('err2: ', err2);
          return res.status(400).send(err2);
        }
        question.set({
          answer: question.answer.filter(
            a => a.toString() !== answer._id.toString()
          ),
        });
        return question.save((err3, updatedQuestion) => {
          if (err3) {
            console.log('err3: ', err3);
            return res.status(400).send(err3);
          }
          return res.json({ question: updatedQuestion, answer, message: 'Answer Deleted' });
        });
      });
    });
  },
};
