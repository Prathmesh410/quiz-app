const express = require('express');
const router = express.Router();
const {createQuestion,getQuestionById,updateQuestion,deleteQuestion} = require('../controllers/Question');

router.post('/questions', createQuestion);

router.get('/questions/:id', getQuestionById);
router.put('/questions/:id', updateQuestion);
router.delete('/questions/:id', deleteQuestion);

module.exports = router;