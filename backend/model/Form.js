const mongoose = require('mongoose');

const questionModel = new mongoose.Schema({
  type: { type: String, required: true }, // 'categorize', 'cloze', 'comprehension'
  questionText: { type: String, required: true },
  options: [String], // For categorize type
  comprehensionText: String, // For comprehension type
  image: String,
});

const formModel = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  headerImage: String,
  questions: [questionModel],
});

module.exports = mongoose.model('Form', formModel);
