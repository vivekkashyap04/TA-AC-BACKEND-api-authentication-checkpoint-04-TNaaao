const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema(
  {
    text: { type: String, required: true },
    author: {
      id: { type: String, required: true },
      usename: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Questions', answerSchema);
