/* eslint consistent-return:0 */

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const chalk = require('chalk');

const logger = require('./logger');
const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
// const passport = require('./middlewares/passport');
const { MONGO_URL } = require('./config');
const setRouter = require('./routes');

const resolve = require('path').resolve;
const app = express();

global.__root = __dirname;
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(cors());

/* eslint-disable no-console */
mongoose.connect(MONGO_URL, err => {
  if (err) {
    console.error(chalk.red('[MongoDB] NOT connected.\n'));
    throw err;
  }
  console.log(chalk.green('[MongoDB] connected.\n'));
});

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
setRouter(app);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, err => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});
