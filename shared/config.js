const db = {
  uname: 'fuchenxu',
  psw: 'fcx20121221',
  hostname: '127.0.0.1:27017',
  database: 'U-Circle',
};

module.exports = {
  APP_NAME: 'U-Circle',
  WEB_PORT: process.env.PORT || 3000,
  ROOT_URL: 'http://10.8.204.46:3000',
  // STATIC_PATH: '/static',
  MONGO_URL: `mongodb://${db.uname}:${db.psw}@${db.hostname}/${db.database}`,
};
