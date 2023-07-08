const express = require('express');
const router = express.Router();
const {createQuestion,getQuestionById,updateQuestion,deleteQuestion,getQuestionsByQuizId} = require('../controllers/Question');
const {isSignedIn,isAuthenticated,getUserByIdMiddleware} = require('../controllers/auth');
//params
router.param("userId",getUserByIdMiddleware);

router.post('/:quizId/questions/:userId',isSignedIn,isAuthenticated, createQuestion);
router.get('/questions/:id/:userId', getQuestionById);
router.put('/questions/:id/:userId',isSignedIn,isAuthenticated, updateQuestion);
router.delete('/:quizId/questions/:id/:userId',isSignedIn,isAuthenticated, deleteQuestion);
router.get('/quizzes/:quizId/questions', getQuestionsByQuizId);
module.exports = router;