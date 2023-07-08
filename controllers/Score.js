const Score = require('../models/Score');
const Question = require('../models/Question')

const calculateScore = async (req, res) => {
  try {
    const participantId = req.params.participantId;
    const participantAnswers = req.body.answers;
    const quizId = req.params.quizId;
    let score = 0;
    for (const participantAnswer of participantAnswers) {
      const { questionId, answers } = participantAnswer;
      const question = await Question.findById(questionId).lean();
      const correctAnswers = question.correctAnswer;

      if (answers.length !== correctAnswers.length) {
        continue; 
      }

      const isAllCorrect = answers.every((answer) => correctAnswers.includes(answer));
      if (isAllCorrect) {
        score++;
      }
    }

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
  getScoresByQuizId,
  getScoresByParticipantId
};