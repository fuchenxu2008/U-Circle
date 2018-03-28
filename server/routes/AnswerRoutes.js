const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');
const { getAnswer, deleteAnswer } = require('../controllers/AnswerController');

router.get('/:id', getAnswer);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteAnswer);

module.exports = router;
