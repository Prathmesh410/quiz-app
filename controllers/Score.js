const Score = require('../models/Score');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question')
const calculateScore = async (req, res) => {
  try {
    const participantId = req.params.participantId;
    const participantAnswers = req.body.answers;
    const quizId = req.params.quizId;
    console.log("participant answers",participantAnswers);
    let score = 0;
    console.log("check");
    for (const participantAnswer of participantAnswers) {
      const { questionId, answers } = participantAnswer;
      const question = await Question.findById(questionId).lean();
      const correctAnswers = question.correctAnswer;

      if (answers.length !== correctAnswers.length) {
        continue; // Skip this question if the number of options selected is not equal to the number of correct answers
      }

      const isAllCorrect = answers.every((answer) => correctAnswers.includes(answer));
      if (isAllCorrect) {
        score++; // Increment the score for each correct answer
      }
    }
    console.log("check 3");
    // Save the calculated score in the database
    const newScore = await Score.create({
      quizId,
      participantId,
      score
    });

    res.status(201).json(newScore);
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate the score' });
  }
};

const addScore = async (req, res) => {
  try {
    const { quizId, participantId, score } = req.body;

    // Create the score
    const newScore = await Score.create({
      quizId,
      participantId,
      score
    });

    res.status(201).json(newScore);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add the score' });
  }
};

const getScoresByQuizId = async (req, res) => {
    try {
      const quizId = req.params.quizId;
  
      // Find all scores for the quiz
      const scores = await Score.find({ quizId });
  
      res.json(scores);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve the scores' });
    }
  };


  const getScoresByParticipantId = async (req, res) => {
    try {
      const participantId = req.params.participantId;
  
      // Find all scores for the participant
      const scores = await Score.find({ participantId });
  
      res.json(scores);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve the scores' });
    }
  };


module.exports = {
  calculateScore,
  addScore,
  getScoresByQuizId,
  getScoresByParticipantId
};