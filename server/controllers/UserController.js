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
      if (err || !user) return res.status(400).send(err);
      return res.json(user);
    });
  },
  changeAvatar: (req, res) => {
    uploadAvatar(req, res, err => {
      if (err) return res.status(400).send(err);
      User.findByIdAndUpdate(req.user._id, { avatar: `/api/user/avatar/${req.file.filename}` }, (err2, user) => {
        if (err2 || !user) return res.status(400).send(err2);
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
      .then(questions => res.json(questions))
      .catch(err => res.status(400).send(err));
  },

  getMyAnswers: (req, res) => {
    const { id } = req.params;
    Answer.find({ answerer: id })
      .then(answers => res.json(answers))
      .catch(err => res.status(400).send(err));
  },

};
