const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  participantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Participant',
    required: true
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  selectedAnswer: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Response', responseSchema);
