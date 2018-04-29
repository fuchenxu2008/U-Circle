const authRoutes = require('./AuthRoutes');
const userRoutes = require('./UserRoutes');
const questionRoutes = require('./QuestionRoutes');
const answerRoutes = require('./AnswerRoutes');
const searchRoutes = require('./SearchRoutes');

module.exports = function setRouter(app) {
  app.use('/api/auth', authRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/question', questionRoutes);
  app.use('/api/answer', answerRoutes);
  app.use('/api/search', searchRoutes);
};
