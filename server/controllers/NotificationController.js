// const Notification = require('../models/Notification');

module.exports = {
  sendNotification: ({ target, notification, socket }) => {
    socket.emit(target, notification);
    console.log('Sent to ', target);
    // Notification.create({}, (err, noti) => {
    //   if (err) return err;
    //   return noti;
    // });
  },
};
