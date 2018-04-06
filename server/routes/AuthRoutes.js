const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');
const { register, login } = require('../controllers/AuthController');

router.post('/register', register);
router.post('/login', passport.authenticate('local', { session: false }), login);

module.exports = router;
