const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');
const { getNotification, markNotification } = require('../controllers/NotificationController');

router.get('/:id', passport.authenticate('jwt', { session: false }), getNotification);
router.post('/markread', passport.authenticate('jwt', { session: false }), markNotification);

module.exports = router;
