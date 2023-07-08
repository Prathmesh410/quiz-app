const express = require('express');
const router = express.Router();
const {createQuestion,getQuestionById,updateQuestion,deleteQuestion,getQuestionsByQuizId} = require('../controllers/Question');
router.post('/:quizId/questions', createQuestion);
router.get('/questions/:id', getQuestionById);
router.put('/questions/:id', updateQuestion);
router.delete('/:quizId/questions/:id', deleteQuestion);
router.get('/quizzes/:quizId/questions', getQuestionsByQuizId);
module.exports = router;