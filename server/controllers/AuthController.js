/* eslint consistent-return:0 */
/* eslint no-underscore-dangle: 0 */

const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const sendMail = require('../middlewares/nodemailer');

module.exports = {
  // Register new user
  register: (req, res) => {
    const { email, nickname, password, role } = req.body;
    // In case of register info is incomplete
    if (!email || !password) return res.status(400).json({ message: 'Incomplete information!' });
    // Check if there are duplicated user emails
    User.findOne({ email: req.body.email }, (err, duplicateUser) => {
      if (err) return res.status(400).send(err);
      if (duplicateUser) return res.status(400).json({ message: 'User with that email already existed!' });
      // Salt and hash password
      sendMail(email, nickname);
      const hashedPassword = bcrypt.hashSync(password, 8);
      User.create({
        email,
        nickname,
        password: hashedPassword,
        role,
      },
        (err2, user) => {
          if (err2) return res.status(400).send(err2);
          return res.json(user);
        }
      );
    });
  },

  login: (req, res) => {
    passport.authenticate('local', { session: false }, (err, user /* , info */) => {
      if (err) return res.status(400).send(err);
      if (!user) return res.status(404).json({ message: 'Invalid Credentials!' });
      req.login(user, { session: false }, err2 => {
        if (err2) return res.status(400).send(err2);
      });
      const token = jwt.sign({ user }, 'secret');
      return res.json({ ...user._doc, token });
    })(req, res);
  },
};
