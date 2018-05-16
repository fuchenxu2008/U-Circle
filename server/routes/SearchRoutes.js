const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');
const { searchQuestion } = require('../controllers/SearchController');

router.get('', passport.authenticate('jwt', { session: false }), searchQuestion);

module.exports = router;
