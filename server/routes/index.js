const express = require('express');
const router = express.Router();
const { getBooks } = require('../controllers');

router.get('/books', getBooks);

module.exports = router;
