const express = require('express');
const router = express.Router();
const {calculateScore,addScore,getScoresByQuizId,getScoresByParticipantId} = require('../controllers/Score');

// Add a score for a participant in a quiz
router.post('/quizzes/:quizId/participants/:participantId/scores', calculateScore);

// Retrieve all scores for a specific quiz
router.get('/quizzes/:quizId/scores', getScoresByQuizId);

// Retrieve all scores for a specific participant
router.get('/participants/:participantId/scores', getScoresByParticipantId);

module.exports = router;
