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

  const getQuestionById = async (req, res) => {
    try {
      const questionId = req.params.id;
      
      // Find the question by its ID
      const question = await Question.findById(questionId);
  
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
  
      res.json(question);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve the question' });
    }
  };

  const updateQuestion = async (req, res) => {
    try {
      const questionId = req.params.id;
      const { question, options, correctAnswer } = req.body;
  
      // Find and update the question
      const updatedQuestion = await Question.findByIdAndUpdate(
        questionId,
        { question, options, correctAnswer },
        { new: true }
      );
  
      if (!updatedQuestion) {
        return res.status(404).json({ error: 'Question not found' });
      }
  
      res.json(updatedQuestion);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update the question' });
    }
  };

  const deleteQuestion = async (req, res) => {
    try {
      const questionId = req.params.id;
      
      // Find and delete the question
      const deletedQuestion = await Question.findByIdAndDelete(questionId);
  
      if (!deletedQuestion) {
        return res.status(404).json({ error: 'Question not found' });
      }
  
      res.json({ message: 'Question deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete the question' });
    }
  };
  const getQuestionsByQuizId = async (req, res) => {
    try {
      const quizId = req.params.quizId;
      
      // Find all questions belonging to the quiz
      const questions = await Question.find({ quizId });
  
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve the questions' });
    }
  };

  module.exports = {
    createQuestion,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
    getQuestionsByQuizId
  };