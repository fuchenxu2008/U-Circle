/* eslint consistent-return:0 */

const moment = require('moment');
const path = require('path');
const { unlink } = require('fs');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { uploadPostImg } = require('../middlewares/multer');
const { sendNotification } = require('./NotificationController');

const creditCost = {
  academic: 10,
  occupational: 30,
  bestAnswer: 20,
  normalAnswer: 2,
};

module.exports = {
  getQuestions: (req, res) => {
    Question.find({ type: req.params.type })
    .populate('questioner', ['nickname', 'avatar', 'role', 'id'])
    .populate({ path: 'answer', populate: { path: 'answerer', select: ['avatar', 'nickname', 'role', 'id'] } })
    .sort({ created_at: -1 })
    .exec((err, questions) => {
      if (err) return res.status(400).send(err);
      if (!questions) return res.status(404).json({ message: 'No question found!' });
      return res.json(questions);
    });
  },

  getQuestion: (req, res) => {
    Question.findById(req.params.id)
    .populate({ path: 'bestAnswer', populate: { path: 'answerer', select: ['avatar', 'nickname', 'role', 'id'] } })
    .populate('questioner', ['nickname', 'avatar', 'role', 'id'])
    .populate({ path: 'answer', populate: { path: 'answerer', select: ['avatar', 'nickname', 'role', 'id'] } })
    .exec((err, question) => {
      if (err) return res.status(400).send(err);
      if (!question) return res.status(404).json({ message: 'No question found!' });
      return res.json(question);
    });
  },

  addQuestion: (req, res) => {
    uploadPostImg(req, res, err => {
      if (err) return res.status(400).send(err);
      const { type, title, body, questioner, major } = req.body;
      if (!type || !title || !body || !questioner || !major) return res.json({ message: 'Incomplete question!' });
      User.findById(questioner, (err1, questionerUser) => {
        if (err1) return res.status(400).send(err1);
        if (!questionerUser) return res.status(404).json({ message: 'No user found!' });
        /* eslint-disable no-param-reassign */
        questionerUser.credit -= creditCost[type];
        questionerUser.save(err2 => {
          if (err2) return res.status(400).send(err2);
          // Add question
          const imgList = req.files.map(img => `/api/question/img/${img.filename}`);
          Question.create({ type, major, title, body: body.replace(new RegExp('\\r\\n', 'g'), '<br />'), questioner, images: imgList, created_at: moment().format('YYYY-MM-DD HH:mm:ss') },
            (err3, newQuestion) => {
              if (err3) return res.status(400).send(err3);
              Question.findById(newQuestion._id)
                .populate('questioner', ['nickname', 'avatar', 'role', 'id'])
                .exec((err4, question) => {
                  if (err4) return res.status(400).send(err4);
                  if (!question) return res.status(404).json({ message: 'No question found!' });

                  // Emit socket to force refetch
                  req.app.get('socket').emit('data', 'New question!');

                  return res.json({ question, remainingCredit: questionerUser.credit, message: 'Post created!' });
                });
            }
          );
        });
      });
    });
  },

  editQuestion: (req, res) => {
    Question.findByIdAndUpdate(req.body.id, {
      title: req.body.title,
      body: req.body.body,
    }, { new: true },
      (err, question) => {
        if (err) return res.status(400).send(err);
        if (!question) return res.status(404).json({ message: 'Question not found!' });
        return res.json({ question, message: 'Post updated!' });
      }
    );
  },

  deleteQuestion: (req, res) => {
    Question.findByIdAndRemove(req.body.id, (err, question) => {
      if (err) return res.status(400).send(err);
      if (!question) return res.status(404).json({ message: 'Question not found!' });
      // Remove all related imgs
      if (question.images) {
        question.images.forEach(imgApiPath => {
          const imgPath = imgApiPath.split('/').pop();
          unlink(`${global.__root}/storage/post-img/${imgPath}`);
        });
      }
      Answer.remove({ question: question._id }, err1 => {
        if (err1) return res.status(400).send(err1);
        Notification.remove({ relatedQuestion: question._id }, err2 => {
          if (err2) return res.status(400).send(err2);
          return res.json({ message: 'Question deleted.', question });
        });
      });
    });
  },

  answerQuestion: (req, res) => {
    const { content, answerer } = req.body; // Answer info
    const { id } = req.params;  // Question id
    if (!content || !answerer || !id) return res.json({ message: 'Incomplete answer details!' });
    Answer.create({
      content,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      answerer,
      question: id,
    }, (err, answer) => {
      if (err || !answer) return res.status(400).send(err);
      // Dumb populate answerer info
      User.findById(answerer, (err0, answererObj) => {
        if (err0) return res.status(400).send(err0);
        if (!answererObj) return res.status(404).json({ message: 'No answerer found!' });
        /* eslint-disable no-param-reassign */
        answererObj.credit += creditCost.normalAnswer;
        answererObj.save()
        .then(() => {
          // Insert answer to the question
          Question.findById(id, (err2, oldQuestion) => {
            if (err2) return res.status(400).send(err2);
            if (!oldQuestion) return res.status(404).json({ message: 'No question found!' });
            // Update answers array of the question
            oldQuestion.set({ answer: oldQuestion.answer.concat(answer._id) });
            oldQuestion.save(err3 => {
              if (err3) return res.json(err3);
              // Dumb populate various detail info of the question
              Question.findById(id)
              .populate({ path: 'bestAnswer', populate: { path: 'answerer', select: ['avatar', 'nickname', 'role', 'id'] } })
              .populate('questioner', ['nickname', 'avatar', 'role', 'id'])
              .populate({ path: 'answer', populate: { path: 'answerer', select: ['avatar', 'nickname', 'role', 'id'] } })
              .exec((err4, question) => {
                if (err4) return res.status(400).send(err4);
                if (!question) return res.status(404).json({ message: 'No question found!' });
                // Send notification to all subscribers and question owner
                sendNotification({
                  notification: {
                    targetUsers: [
                      question.questioner._id,  // Questioner id
                      ...question.subscribers.filter(subscriber => subscriber.toString() !== answerer),  // Subscibers id
                    ],
                    fromUser: answererObj,  // Answerer model (front need nickname, db need id)
                    relatedQuestion: { // Related question
                      title: question.title,
                      id: question._id,
                      questioner: question.questioner,  // Questioner model
                      type: question.type,
                    },
                  },
                  socket: req.app.get('socket'),
                });
                return res.json({ question, remainingCredit: answererObj.credit, message: 'Answer submitted' });
              });
            });
          });
        })
        .catch(err1 => res.status(400).send(err1));
      });
    });
  },

  subscribeQuestion: (req, res) => {
    const { userId } = req.body;
    Question.findById(req.params.id)
      .then(question => {
        if (!question) return res.status(404).json({ message: 'No question found!' });
        // Judge if already subscribed, if not => subscribe, else => unsubcribe!
        const subscribed = question.subscribers.map(subscriber => subscriber.toString()).includes(userId);
        if (subscribed) {
          question.set({
            subscribers: question.subscribers.filter(subscriber => subscriber.toString() !== userId),
          });
        } else {
          question.set({
            subscribers: question.subscribers.concat(userId),
          });
        }
        question
          .save()
          .then(updatedQuestion => {
            Question.populate(updatedQuestion, {
              path: 'questioner',
              select: ['avatar', 'nickname', 'role', '_id'],
            })
              .then(populatedQuestion => res.json(populatedQuestion))
              .catch(err => res.status(400).send(err));
          })
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  },

  pickBestAnswer: (req, res) => {
    const { answerId } = req.body;
    Question.findById(req.params.id)
      .then(question => {
        if (!question) return res.status(404).json({ message: 'No question found!' });
        // If best answer picked already, abort and alert user
        if (question.bestAnswer) {
          return res.status(400).json({ message: 'Best answer already selected!' });
        }
        question.set({ bestAnswer: answerId });
        question
          .save()
          .then(updatedQuestion => {
            Answer.findById(answerId).then(answer => {
              User.findById(answer.answerer).then(answerer => {
                answerer.credit += creditCost.bestAnswer;
                answerer.save().then(() => {
                  Question.findById(updatedQuestion._id)
                    .populate({ path: 'bestAnswer', populate: { path: 'answerer', select: ['avatar', 'nickname'] } })
                    .populate({ path: 'answer', populate: { path: 'answerer', select: ['avatar', 'nickname'] } })
                    .populate({ path: 'questioner', select: ['avatar', 'nickname', 'role', '_id'] })
                    .then(populatedQuestion => res.json(populatedQuestion));
                });
              });
            });
          });
      })
      .catch(err => res.status(400).send(err));
  },

  getQuestionImages: (req, res) => {
    try {
      res.sendFile(path.join(global.__root, `storage/post-img/${req.params.id}`));
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
