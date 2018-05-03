const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = Schema({
  targetUser: { type: Schema.Types.ObjectId, ref: 'User' },
  fromUser: { type: Schema.Types.ObjectId, ref: 'User' },
  created_at: Date,
  content: String,
  linkTo: String,
  markRead: Boolean,
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
