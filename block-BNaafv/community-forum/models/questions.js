const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    title: { type: String, required: true },
    author: {
      id: { type: String, required: true },
      usename: { type: String, required: true },
    },
    descriptions: String,
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Questions', questionSchema);
