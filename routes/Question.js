const express = require('express');
const router = express.Router();
const {createQuestion,getQuestionById,updateQuestion} = require('../controllers/Question');

router.post('/questions', createQuestion);

router.get('/questions/:id', getQuestionById);
router.put('/questions/:id', updateQuestion);

module.exports = router;