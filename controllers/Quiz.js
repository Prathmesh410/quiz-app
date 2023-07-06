const Quiz = require('../models/Quiz');

const createQuiz = async (req, res) => {
  try {
    const { title, creator } = req.body;
    
    // Create the quiz
    const newQuiz = await Quiz.create({
      title,
      creator
    });

    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create the quiz' });
  }
};

const getQuizById = async (req, res) => {
    try {
      const quizId = req.params.id;
      
      // Find the quiz by its ID
      const quiz = await Quiz.findById(quizId);
  
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
  
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve the quiz' });
    }
  };

  const getAllQuizzes = async (req, res) => {
    try {
      // Find all quizzes
      const quizzes = await Quiz.find();
  
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve the quizzes' });
    }
  };

module.exports = {
  createQuiz,
  getQuizById,
  getAllQuizzes
};
