const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema(
  {
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    answerId: { type: mongoose.Types.ObjectId, ref: 'Answer' },
    questionId: { type: mongoose.Types.ObjectId, ref: 'Question' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Questions', answerSchema);
