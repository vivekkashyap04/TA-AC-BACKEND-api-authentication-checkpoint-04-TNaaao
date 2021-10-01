var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Question = require('../models/questions');
var Answer = require('../models/answer');
var auth = require('../middleware/auth');

router.post('/', auth.verifyToken, async (req, res, next) => {
  req.body.tags = req.body.tags.trim().split(',');
  req.body.author.id = req.user.id;
  req.body.author.username = req.uer.username;
  try {
    var question = await Question.create(req.body);
    res.json({ question });
  } catch (error) {
    next(error);
  }
});

router.get('/', async function (req, res, next) {
  try {
    let questions = await Question.find({});

    res.json({ questions });
  } catch (error) {
    next(error);
  }
});
//edit
router.get('/:id', async (req, res, next) => {
  var id = req.params.id;
  try {
    let question = await Question.findById(id);
    res.json({ question });
  } catch (error) {
    next(error);
  }
});
//update
router.put('/:id', async (req, res, next) => {
  var id = req.params.id;
  try {
    let question = await Question.findById(id);
    if (question.author.id === req.user.id) {
      let updatedQuestion = await Question.findByIdAndUpdate(id, req.body);
      res.json({ updatedQuestion });
    } else {
      res.json({ error: 'the question do not belong to you' });
    }
  } catch (error) {
    next(error);
  }
});

//delete
router.delete('/:id', async (req, res, next) => {
  var id = req.params.id;
  try {
    let question = await Question.findById(id);
    if (question.author.id === req.user.id) {
      let updatedQuestion = await Question.findByIdAndUpdate(id, req.body);
      let answer = await Answer.deleteMany({ questionId: id });
      res.json({ updatedQuestion });
    } else {
      res.json({ error: 'the question do not belong to you' });
    }
  } catch (error) {
    next(error);
  }
});

//add answer
router.post('/:questionId/answers', async (req, res, next) => {
  req.body.questionId = req.params.questionId;
  req.body.author.id = req.user.id;
  req.body.author.username = req.uer.username;
  try {
    let answer = await Answer.create(req.body);
    res.json({ answer });
  } catch (error) {
    next(error);
  }
});

//list of answer
router.get('/:questionId/answers', async (req, res, next) => {
  let questionId = req.params.questionId;

  try {
    let answer = await Question.find({ questionId });
    return res.json({ answer });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
