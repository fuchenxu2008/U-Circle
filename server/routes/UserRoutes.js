const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');
const { changeAvatar, getAvatar, getUser } = require('../controllers/UserController');

router.post('/avatar', passport.authenticate('jwt', { session: false }), changeAvatar);
router.get('/avatar/:userId', getAvatar);
router.get('/:id', getUser);

module.exports = router;
