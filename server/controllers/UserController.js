/* eslint consistent-return:0 */

const path = require('path');
const { unlink } = require('fs');
const User = require('../models/User');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const { uploadAvatar } = require('../middlewares/multer');

module.exports = {
  getUser: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) return res.status(400).send(err);
      if (!user) return res.status(404).json({ message: 'No user found!' });
      return res.json(user);
    });
  },

  getAlumni: (req, res) => {
    User.find({ role: 'alumni' })
    .then(alumni => res.json(alumni))
    .catch(err => res.status(400).send(err));
  },

  changeAvatar: (req, res) => {
    uploadAvatar(req, res, err => {
      if (err) return res.status(400).send(err);
      User.findByIdAndUpdate(req.user._id, { avatar: `/api/user/avatar/${req.file.filename}` }, (err2, user) => {
        if (err2) return res.status(400).send(err2);
        if (!user) return res.status(404).json({ message: 'No user found!' });
        if (user.avatar) {
          const oldAvatarPath = user.avatar.split('/').pop();
          unlink(`${global.__root}/storage/avatar/${oldAvatarPath}`);
        }
        return res.json({ avatar: `/api/user/avatar/${req.file.filename}` });
      });
    });
  },
  getAvatar: (req, res) => {
    try {
      res.sendFile(path.join(global.__root, `storage/avatar/${req.params.id}`));
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getMyQuestions: (req, res) => {
    const { id } = req.params;
    Question.find({ questioner: id })
      .populate('questioner', ['nickname', 'avatar', 'role', 'id'])
      .populate({ path: 'answer', populate: { path: 'answerer', select: ['avatar', 'nickname', 'role', 'id'] } })
      .then(questions => {
        if (!questions) return res.status(404).json({ message: 'No question found!' });
        return res.json(questions);
      })
      .catch(err => res.status(400).send(err));
  },

  getMyAnswers: (req, res) => {
    const { id } = req.params;
    Answer.find({ answerer: id })
      .populate({ path: 'question', populate: { path: 'questioner', select: ['avatar', 'nickname', 'role', 'id'] } })
      .sort({ created_at: -1 })
      .then(answers => {
        if (!answers) return res.status(404).json({ message: 'No answer found!' });
        return res.json(answers);
      })
      .catch(err => res.status(400).send(err));
  },

  getMySubscription: (req, res) => {
    const { id } = req.params;
    Question.find({ subscribers: id })
      .populate('questioner', ['nickname', 'avatar', 'role', 'id'])
      .populate({ path: 'answer', populate: { path: 'answerer', select: ['avatar', 'nickname', 'role', 'id'] } })
      .sort({ created_at: -1 })
      .then(questions => {
        if (!questions) return res.status(404).json({ message: 'No question found!' });
        return res.json(questions);
      })
      .catch(err => res.status(400).send(err));
  },

};
