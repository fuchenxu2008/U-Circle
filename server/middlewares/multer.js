const multer = require('multer');
const path = require('path');
const uuidv4 = require('uuid/v4');

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${global.__root}/storage/avatar`);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  },
});

const postImgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${global.__root}/storage/post-img`);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  },
});

const uploadAvatar = multer({ storage: avatarStorage }).single('avatar');
const uploadPostImg = multer({ storage: postImgStorage }).array('postImg', 9);

module.exports = { uploadAvatar, uploadPostImg };
