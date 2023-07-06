const express = require('express');
const router = express.Router();
const {createQuestion} = require('../controllers/Question');

router.post('/questions', createQuestion);

module.exports = router;