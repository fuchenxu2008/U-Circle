/* eslint consistent-return:0 */
/* eslint no-underscore-dangle: 0 */

const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, cb) => {
      User.findOne({ email })
        .then(user => {
          if (!user) return cb(null, false, { message: 'No user registered with this email!' });
          if (!bcrypt.compareSync(password, user.password)) {
            return cb(null, false, { message: 'Invalid credentials!' });
          }
          return cb(null, user, {
            message: 'Logged In Successfully',
          });
        })
        .catch(err => cb(err));
    }
  )
);

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
},
  (jwtPayload, cb) => (
    User.findById(jwtPayload.user._id)
      .then(user => (cb(null, user)))
      .catch(err => cb(err))
)));

module.exports = passport;
