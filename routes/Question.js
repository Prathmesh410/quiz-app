const express = require('express');
const router = express.Router();
const {createQuestion,getQuestionById,updateQuestion,deleteQuestion,getQuestionsByQuizId} = require('../controllers/Question');
const {isSignedIn,isAuthenticated,getUserByIdMiddleware} = require('../controllers/auth');
//params
router.param("userId",getUserByIdMiddleware);

router.post('/:quizId/questions',isSignedIn,isAuthenticated, createQuestion);
router.get('/questions/:id', getQuestionById);
router.put('/questions/:id',isSignedIn,isAuthenticated, updateQuestion);
router.delete('/:quizId/questions/:id',isSignedIn,isAuthenticated, deleteQuestion);

//optional
router.get('/quizzes/:quizId/questions',isSignedIn,isAuthenticated, getQuestionsByQuizId);
module.exports = router;