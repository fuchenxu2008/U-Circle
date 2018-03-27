const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const transporter = nodemailer.createTransport({
  service: '163',
  auth: {
    user: 'fuchenxu2008@163.com',
    pass: 'Fcx700221',
  },
});

// Configure mailgen by setting a theme and your product info
const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
      // Appears in header & footer of e-mails
    name: 'Chenxu Fu',
    link: 'https://quora.kyrie.top/',
    copyright: 'Copyright © 2018 Chenxu Fu. All rights reserved.',
    // Optional product logo
    logo: 'http://o6w0bsnj8.bkt.clouddn.com/favicon.png',
  },
});

module.exports = (recipient, uname) => {
  const email = {
    body: {
      name: uname,
      intro: 'This is intro',
      outro: 'This is outro',
      signature: 'Cheers',
    },
  };

  const emailBody = mailGenerator.generate(email);
  const emailText = mailGenerator.generatePlaintext(email);

  const mailOptions = {
    from: '"Steve 🍟" <fuchenxu2008@163.com>',
    to: recipient,
    subject: 'Hello from U-Circle!',
    html: emailBody,
    text: emailText,
    // attachments: [{ path: '' }],
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return console.log(err);
    return console.log('Message sent: %s', info.messageId);
  });
};
