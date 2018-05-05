const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');
const { searchStudentQuestion } = require('../controllers/SearchController');

router.get('', passport.authenticate('jwt', { session: false }), searchStudentQuestion);

module.exports = router;
