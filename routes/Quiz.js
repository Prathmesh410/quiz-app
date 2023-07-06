const express = require('express');
const router = express.Router();
const {createQuiz,getQuizById,getAllQuizzes,updateQuiz,deleteQuiz,shareQuiz,getParticipantScores} = require('../controllers/Quiz');

router.post('/quizzes',createQuiz);
router.get('/quizzes/:id', getQuizById);
router.get('/quizzes', getAllQuizzes);
router.put('/quizzes/:id', updateQuiz);
router.delete('/quizzes/:id', deleteQuiz);



//to this leter
router.get('/quizzes/:id/share', shareQuiz);
router.get('/participants/:participantId/scores',getParticipantScores);

module.exports = router;