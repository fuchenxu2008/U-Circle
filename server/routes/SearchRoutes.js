const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');
const { searchPeerQuestion } = require('../controllers/SearchController');

router.get('', passport.authenticate('jwt', { session: false }), searchPeerQuestion);

module.exports = router;
