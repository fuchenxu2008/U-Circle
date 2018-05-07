const Answer = require('../models/Answer');
const Question = require('../models/Question');

module.exports = {
  getAnswer: (req, res) => {
    Answer.findById(req.params.id, (err, answer) => {
      if (err) return res.status(400).send(err);
      if (!answer) return res.status(404).json({ message: 'No answer found!' });
      return res.json(answer);
    });
  },

  deleteAnswer: (req, res) => {
    Answer.findByIdAndRemove(req.params.id, (err, answer) => {
      if (err) return res.status(400).send(err);
      if (!answer) return res.status(404).json({ message: 'Answer already deleted.' });
      // Update related question's answer list
      return Question.findById(answer.question, (err2, question) => {
        if (err2) return res.status(400).send(err2);
        if (!question) return res.status(404).json({ message: 'No question found!' });
        question.set({
          answer: question.answer.filter(
            a => a.toString() !== answer._id.toString()
          ),
        });
        return question.save((err3, updatedQuestion) => {
          if (err3) return res.status(400).send(err3);
          if (!updatedQuestion) return res.status(404).json({ message: 'No updatedQuestion found!' });
          // Check for best answer concerned
          return Question.findOneAndUpdate({ bestAnswer: answer._id }, { $set: { bestAnswer: undefined } }, { new: true }, (err4, questionWithBestAnswer) => {
            if (err4) return res.status(400).send(err4);
            if (!questionWithBestAnswer) return res.json({ question: updatedQuestion, answer, message: 'Answer Deleted' });
            return res.json({ question: questionWithBestAnswer, answer, message: 'Answer Deleted' });
          });
        });
      });
    });
  },
};
