const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');
const { getQuestions, addQuestion, editQuestion, deleteQuestion } = require('../controllers/QuestionController');

router.get('/', getQuestions);
router.post('/', passport.authenticate('jwt', { session: false }), addQuestion);
router.put('/', passport.authenticate('jwt', { session: false }), editQuestion);
router.delete('/', passport.authenticate('jwt', { session: false }), deleteQuestion);

module.exports = router;
