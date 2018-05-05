const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = Schema({
  targetUser: { type: Schema.Types.ObjectId, ref: 'User' },
  fromUser: { type: Schema.Types.ObjectId, ref: 'User' },
  relatedQuestion: { type: Schema.Types.ObjectId, ref: 'Question' },
  created_at: Date,
  markRead: Boolean,
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
