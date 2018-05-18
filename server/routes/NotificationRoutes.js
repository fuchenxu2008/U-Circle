const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');
const { getNotification, markNotification } = require('../controllers/NotificationController');

router.post('/markread', passport.authenticate('jwt', { session: false }), markNotification);
router.get('/:id', passport.authenticate('jwt', { session: false }), getNotification);

module.exports = router;
