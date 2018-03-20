const express = require('express');
const router = express.Router();
const { getQuestions, addQuestion } = require('../controllers/QuestionController');

router.get('/', getQuestions);
router.post('/', addQuestion);

module.exports = router;
