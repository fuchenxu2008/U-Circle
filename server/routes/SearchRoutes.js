const express = require('express');
const router = express.Router();
const { searchQuestion } = require('../controllers/SearchController');

router.get('', searchQuestion);

module.exports = router;
