const express = require('express');
const router = express.Router();
const {createQuiz,getQuizById,getAllQuizzes} = require('../controllers/Quiz');

router.post('/quizzes',createQuiz);
router.get('/quizzes/:id', getQuizById);
router.get('/quizzes', getAllQuizzes);

module.exports = router;