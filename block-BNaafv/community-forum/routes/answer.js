var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Question = require('../models/questions');
var Answer = require('../models/answer');
var auth = require('../middleware/auth');

router.get('/:answerId', async (req, res, next) => {
  let answerId = req.params.id;
  try {
    let answer = await Answer.findById(answerId);
    res.json({ answer });
  } catch (error) {
    next(error);
  }
});

router.put('/:answerId', async (req, res, next) => {
  let answerId = req.params.id;
  try {
    let answer = await Answer.findById(answerId);
    if (answer.author.id === req.user.id) {
      let updatedAnswer = await Answer.findByIdAndUpdate(answerId, req.body);
      res.json({ updatedAnswer });
    } else {
      res.json({ error: 'the answer do not belong to you' });
    }
  } catch (error) {
    next(error);
  }
});

//delete
router.put('/:answerId', async (req, res, next) => {
  let answerId = req.params.id;
  try {
    let answer = await Answer.findById(answerId);
    if (answer.author.id === req.user.id) {
      let deletedAnswer = await Answer.findByIdAndDelete(answerId);
      res.json({ deletedAnswer });
    } else {
      res.json({ error: 'the answer do not belong to you' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
