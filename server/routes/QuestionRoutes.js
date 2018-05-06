const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');
const {
  getQuestions,
  getQuestion,
  addQuestion,
  editQuestion,
  deleteQuestion,
  answerQuestion,
  getQuestionImages,
  subscribeQuestion,
  pickBestAnswer,
} = require('../controllers/QuestionController');

router.get('/', getQuestions);
router.get('/:id', getQuestion);
router.post('/', passport.authenticate('jwt', { session: false }), addQuestion);
router.put('/', passport.authenticate('jwt', { session: false }), editQuestion);
router.delete('/', passport.authenticate('jwt', { session: false }), deleteQuestion);
router.post('/:id', passport.authenticate('jwt', { session: false }), answerQuestion);
router.put('/subscribe/:id', passport.authenticate('jwt', { session: false }), subscribeQuestion);
router.put('/pickbest/:id', passport.authenticate('jwt', { session: false }), pickBestAnswer);
router.get('/img/:id', getQuestionImages);

module.exports = router;
