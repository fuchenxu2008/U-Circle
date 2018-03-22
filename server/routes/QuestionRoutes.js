const express = require('express');
const router = express.Router();
const { getQuestions, addQuestion, editQuestion, deleteQuestion } = require('../controllers/QuestionController');

router.get('/', getQuestions);
router.post('/', addQuestion);
router.put('/', editQuestion);
router.delete('/', deleteQuestion);

module.exports = router;
