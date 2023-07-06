const Question = require('../models/Question');

const createQuestion = async (req, res) => {
    try {
      const { quizId, question, options, correctAnswer } = req.body;
      
      // Create the question
      const newQuestion = await Question.create({
        quizId,
        question,
        options,
        correctAnswer
      });
  
      res.status(201).json(newQuestion);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create the question' });
    }
  };

  
  module.exports = {
    createQuestion
  };