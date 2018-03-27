const db = {
  uname: 'fuchenxu',
  psw: 'fcx20121221',
  hostname: '127.0.0.1:27017',
  database: 'U-Circle',
};

const isDev = process.env.NODE_ENV === 'development';
const ROOT_URL = isDev ? 'http://127.0.0.1:3000' : 'https://quora.kyrie.top';

module.exports = {
  APP_NAME: 'U-Circle',
  WEB_PORT: process.env.PORT || 3000,
  ROOT_URL,
  // STATIC_PATH: '/static',
  MONGO_URL: 'mongodb://' + db.uname + ':' + db.psw + '@' + db.hostname + '/' + db.database, // eslint-disable-line prefer-template
};
