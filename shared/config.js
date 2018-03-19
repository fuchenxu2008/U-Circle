const db = {
  uname: '',
  psw: '',
  hostname: '127.0.0.1:27017',
  database: '',
};

module.exports = {
  APP_NAME: '',
  WEB_PORT: process.env.PORT || 3000,
  ROOT_URL: 'http://127.0.0.1:3000',
  // STATIC_PATH: '/static',
  MONGO_URL: `mongodb://${db.uname}:${db.psw}@${db.hostname}/${db.database}`,
};
