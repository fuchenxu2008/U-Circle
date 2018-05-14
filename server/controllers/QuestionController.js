/* eslint consistent-return:0 */

const moment = require('moment');
const path = require('path');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { uploadPostImg } = require('../middlewares/multer');
const { sendNotification } = require('./NotificationController');

module.exports = {
  getQuestions: (req, res) => {
    Question.find({ type: req.params.type })
    .populate('questioner', ['nickname', 'avatar', 'role'])
    .populate({ path: 'answer', populate: { path: 'answerer', select: ['avatar', 'nickname'] } })
    .exec((err, questions) => {
      if (err) return res.status(400).send(err);
      if (!questions) return res.status(404).json({ message: 'No question found!' });
      return res.json(questions);
    });
  },

  getQuestion: (req, res) => {
    Question.findById(req.params.id)
    .populate({ path: 'bestAnswer', populate: { path: 'answerer', select: ['avatar', 'nickname'] } })
    .populate('questioner', ['nickname', 'avatar', 'role'])
    .populate({ path: 'answer', populate: { path: 'answerer', select: ['avatar', 'nickname'] } })
    .exec((err, question) => {
      if (err) return res.status(400).send(err);
      if (!question) return res.status(404).json({ message: 'No question found!' });
      return res.json(question);
    });
  },

  addQuestion: (req, res) => {
    uploadPostImg(req, res, err => {
      if (err) return res.status(400).send(err);
      const { type, title, body, questioner } = req.body;
      if (!type || !title || !body || !questioner) return res.json({ message: 'Incomplete question!' });
      User.findById(questioner, (err1, questionerUser) => {
        if (err1) return res.status(400).send(err1);
        if (!questionerUser) return res.status(404).json({ message: 'No user found!' });
        /* eslint-disable no-param-reassign */
        questionerUser.credit -= 10;
        questionerUser.save(err2 => {
          if (err2) return res.status(400).send(err2);
          // Add question
          const imgList = req.files.map(img => `/api/question/img/${img.filename}`);
          Question.create({ type, title, body, questioner, images: imgList, created_at: moment().format('YYYY-MM-DD HH:mm:ss') },
            (err3, newQuestion) => {
              if (err3) return res.status(400).send(err3);
              Question.findById(newQuestion._id)
                .populate('questioner', ['nickname', 'avatar', 'role'])
                .exec((err4, question) => {
                  if (err4) return res.status(400).send(err4);
                  if (!question) return res.status(404).json({ message: 'No question found!' });

                  // Emit socket to force refetch
                  req.app.get('socket').emit('data', 'New question!');

                  return res.json({ question, message: 'Post created!' });
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
      User.findById(answerer, (err1, answererObj) => {
        if (err1) return res.status(400).send(err1);
        if (!answererObj) return res.status(404).json({ message: 'No answerer found!' });
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
            .populate({ path: 'bestAnswer', populate: { path: 'answerer', select: ['avatar', 'nickname'] } })
            .populate('questioner', ['nickname', 'avatar', 'role'])
            .populate({ path: 'answer', populate: { path: 'answerer', select: ['avatar', 'nickname'] } })
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
                  },
                },
                socket: req.app.get('socket'),
              });
              return res.json({ question, message: 'Answer submitted' });
            });
          });
        });
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
        question.set({
          bestAnswer: answerId,
        });
        question
          .save()
          .then(updatedQuestion => {
            Question.findById(updatedQuestion._id)
              .populate({ path: 'bestAnswer', populate: { path: 'answerer', select: ['avatar', 'nickname'] } })
              .populate({ path: 'answer', populate: { path: 'answerer', select: ['avatar', 'nickname'] } })
              .populate({ path: 'questioner', select: ['avatar', 'nickname', 'role', '_id'] })
              .then(populatedQuestion => res.json(populatedQuestion))
              .catch(err => res.status(400).send(err));
          })
          .catch(err => res.status(400).send(err));
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
