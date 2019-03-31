const db = require('./db');

module.exports = {
  secret: 'SUPERSECRET',
  WEB_PORT: process.env.PORT || 3000,
  MONGO_URL: `mongodb://${db.uname}:${db.psw}@${db.hostname}/${db.database}?authSource=admin`,
};
