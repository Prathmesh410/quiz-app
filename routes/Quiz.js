const express = require('express');
const router = express.Router();
const {createQuiz,getQuizById,getAllQuizzes,updateQuiz,deleteQuiz,shareQuiz,getParticipantScores} = require('../controllers/Quiz');
const {isSignedIn,isAuthenticated,getUserByIdMiddleware} = require('../controllers/auth');
const {getQuestionByIdMiddleware} = require('../controllers/Question');
//params
router.param("userId",getUserByIdMiddleware);

router.post('/quizzes/:userId',isSignedIn,isAuthenticated,createQuiz);
router.get('/quizzes/:id/:userId',isSignedIn,isAuthenticated, getQuizById);
router.get('/quizzes', getAllQuizzes);
router.put('/quizzes/:id', updateQuiz);
router.delete('/quizzes/:id', deleteQuiz);



//to this leter
router.get('/quizzes/:id/share', shareQuiz);
router.get('/participants/:participantId/scores',getParticipantScores);

module.exports = router;