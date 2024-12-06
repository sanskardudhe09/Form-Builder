const mongoose = require('mongoose');

const responseModel = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  responses: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      answer: mongoose.Schema.Types.Mixed,
    },
  ],
});

module.exports = mongoose.model('Response', responseModel);
