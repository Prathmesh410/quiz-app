const mongoose = require("mongoose");
//In case you want to analyse each question and the 
//responses it got from each participant then you will need this schema
//Things like charts and analysis can be done through this schema.
//
const responseSchema = new mongoose.Schema({
  participantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Participant",
    required: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  selectedAnswer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Response", responseSchema);
