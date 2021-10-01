var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Question = require('../models/questions');

router.get('/', async (req, res, next) => {
  try {
    var tags = await Question.distinct('tags');
    console.log(tags);
    res.json({ tags });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
