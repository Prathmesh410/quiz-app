const Score = require('../models/Score');

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
  addScore,
  getScoresByQuizId,
  getScoresByParticipantId
};