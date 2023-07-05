const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  participantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Participant',
    required: true
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  score: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Score', scoreSchema);
