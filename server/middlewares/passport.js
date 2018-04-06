/* eslint consistent-return:0 */
/* eslint no-underscore-dangle: 0 */

const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const config = require('../config');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
  (email, password, cb) => {
    User.findOne({ email })
      .then(user => {
        if (!user) return cb(null, false);
        if (!bcrypt.compareSync(password, user.password)) {
          return cb(null, false);
        }
        return cb(null, user);
      })
      .catch(err => cb(err));
  })
);

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret,
},
  (jwtPayload, cb) => (
    User.findById(jwtPayload.sub)
      .then(user => cb(null, user))
      .catch(err => cb(err))
)));

module.exports = passport;
