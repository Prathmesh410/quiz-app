const Question = require('../models/Question');
const Quiz = require('../models/Quiz')
const createQuestion = async (req, res) => {
    try {
      const {  question, options, correctAnswer } = req.body;
      const quizId = req.params.quizId;
      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
      // Create the question
      const newQuestion = await Question.create({
        quizId,
        question,
        options,
        correctAnswer
      });
      quiz.questions.push(newQuestion._id);
      await quiz.save();
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
  
      // Create an update object to include only the provided fields
      const updateObj = {};
      if (question) {
        updateObj.question = question;
      }
      if (options) {
        updateObj.options = options;
      }
      if (correctAnswer) {
        updateObj.correctAnswer = correctAnswer;
      }
  
      // Find and update the question
      const updatedQuestion = await Question.findByIdAndUpdate(
        questionId,
        updateObj,
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
      const quizId = req.params.quizId;
      const quiz = await Quiz.findById(quizId);

      // Find and delete the question
      const deletedQuestion = await Question.findByIdAndDelete(questionId);
  
      if (!deletedQuestion) {
        return res.status(404).json({ error: 'Question not found' });
      }
      quiz.questions = quiz.questions.filter(id => id.toString() !== questionId);
      await quiz.save();
      res.json({ message: 'Question deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete the question' });
    }
  };
  const getQuestionsByQuizId = async (req, res) => {
    try {
      const quizId = req.params.quizId;
      
      // Find all questions belonging to the quiz
      const questions = await Question.find({ quizId }).select('-correctAnswer');
      
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve the questions' });
    }
  };


  const getQuestionByIdMiddleware = async (req, res, next, id) => {
    try {
      const question = await Question.findById(id);
  
      if (!question) {
        return res.status(400).json({
          error: 'Question not found',
        });
      }
  
      req.question = question;
      next();
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve the question' });
    }
  };

  module.exports = {
    createQuestion,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
    getQuestionsByQuizId,
    getQuestionByIdMiddleware
  };