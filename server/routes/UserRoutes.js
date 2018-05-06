const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');
const { changeAvatar, getAvatar, getUser, getMyQuestions, getMyAnswers, getMySubscription } = require('../controllers/UserController');

router.post('/avatar', passport.authenticate('jwt', { session: false }), changeAvatar);
router.get('/avatar/:id', getAvatar);
router.get('/:id', getUser);
router.get('/:id/questions', passport.authenticate('jwt', { session: false }), getMyQuestions);
router.get('/:id/answers', passport.authenticate('jwt', { session: false }), getMyAnswers);
router.get('/:id/subscription', passport.authenticate('jwt', { session: false }), getMySubscription);

module.exports = router;
