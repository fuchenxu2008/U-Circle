/* eslint consistent-return:0 */
/* eslint no-underscore-dangle: 0 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
// const sendMail = require('../middlewares/nodemailer');
const config = require('../config');

function signToken(user) {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: user.id, iat: timestamp }, config.secret);
}

module.exports = {
  // Register new user
  register: (req, res) => {
    const { email, nickname, password, role } = req.body;
    // In case of register info is incomplete
    if (!email || !password || !nickname || !role) return res.status(422).json({ message: 'Incomplete information!' });
    // Check if there are duplicated user emails
    User.findOne({ email }, (err, duplicateUser) => {
      if (err) return res.status(400).send(err);
      if (duplicateUser) return res.status(422).json({ message: 'User with that email already existed!' });
      // sendMail(email, nickname);
      // Salt and hash password
      const hashedPassword = bcrypt.hashSync(password, 8);
      User.create({ email, password: hashedPassword, nickname, role, credit: 100 }, (err2, user) => {
        if (err2) return res.status(400).send(err2);
        return res.json({ ...user._doc, token: signToken(user) });
      });
    });
  },

  login: async (req, res) => {
    // Already authed
    let { user } = req;
    // Initialize user credit on login if credit is not set
    if (!user.credit) {
      await User.findByIdAndUpdate(user.id, { credit: 200 }, { new: true }, (err, updatedUser) => {
        if (err) return res.status(400).send(err);
        if (!updatedUser) return res.status(404).json({ message: 'No user found!' });
        user = Object.assign({}, updatedUser);
      });
    }
    return res.json({ ...user._doc, token: signToken(user) });
  },
};
