const Notification = require('../models/Notification');
const moment = require('moment');

module.exports = {
  sendNotification: ({ notification, socket }) => {
    const { targetUsers, fromUser, relatedQuestion } = notification;
    targetUsers.forEach(targetUser => {
      socket.emit(targetUser, notification);
      Notification.create(
        {
          fromUser: fromUser.id,
          targetUser,
          relatedQuestion: relatedQuestion.id,
          markRead: false,
          created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        },
        (err, noti) => {
          if (err) {
            console.log(err);
            return err;
          }
          return noti;
        }
      );
    });
  },

  getNotification: (req, res) => {
    const { id } = req.params;
    if (id.length !== 24) return res.status(400).json({ message: 'Invalid User ID!' });
    return Notification.find({ targetUser: req.params.id })
      .populate('fromUser', ['nickname', 'avatar', 'role'])
      .populate({ path: 'relatedQuestion', populate: { path: 'questioner', select: ['avatar', 'nickname', 'id'] } })
      .then(notifications => {
        if (!notifications) return res.status(404).json({ message: 'No notification found!' });
        return res.json(notifications);
      })
      .catch(err => res.status(400).send(err));
  },

  markNotification: (req, res) => {
    const { userId, questionId } = req.body;
    return Notification.find({ targetUser: userId, relatedQuestion: questionId })
      .then(notifications => {
        if (!notifications) return res.status(404).json({ message: 'No notification found!' });
        notifications.forEach(notification => {
          notification.set({ markRead: true });
          notification.save()
            .catch(err => res.status(400).send(err));
        });
        return res.json({ userId, questionId, notifications });
      })
      .catch(err => res.status(400).send(err));
  },

};
