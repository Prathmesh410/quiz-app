const Quiz = require('../models/Quiz');

const createQuiz = async (req, res) => {
  console.log(req.params.userId);
    
  try {
    const { title } = req.body;
    const userId  = req.params.userId;
    
    // Create the quiz
    const newQuiz = await Quiz.create({
      title,
      userId
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
      const quiz = await Quiz.findById(quizId).populate('questions');
  
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
      const userId = req.params.userId;
  
      const quizzes = await Quiz.find({ userId });
  
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve the quizzes' });
    }
  };


  const updateQuiz = async (req, res) => {
    try {
      const quizId = req.params.id;
      const { title } = req.body;
  
      // Find and update the quiz
      const updatedQuiz = await Quiz.findByIdAndUpdate(
        quizId,
        { title },
        { new: true }
      );
  
      if (!updatedQuiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
  
      res.json(updatedQuiz);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update the quiz' });
    }
  };

  const deleteQuiz = async (req, res) => {
    try {
      const quizId = req.params.id;
      
      // Find and delete the quiz
      const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
  
      if (!deletedQuiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
  
      res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete the quiz' });
    }
  };

  const shareQuiz = async (req, res) => {
    try {
      const quizId = req.params.id;
    
      const shareableLink = `https://quiz-app-64oc.onrender.com/api/quizzes/${quizId}`;
  
      res.json({ shareableLink });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate the shareable link' });
    }
  };

 
  const getParticipantScores = async (req, res) => {
    try {
      const participantId = req.params.participantId;
  
      // Find the scores of the participant for all quizzes
      const scores = await Score.find({ participantId });
  
      res.json(scores);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve the scores' });
    }
  };


   //middleware

   const getQuizByIdMiddleware = async (req, res, next, id) => {
    try {
      const quiz = await Quiz.findById(id);
  
      if (!quiz) {
        return res.status(400).json({
          error: 'Quiz not found',
        });
      }
  
      req.quiz = quiz;
      next();
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve the quiz' });
    }
  };


module.exports = {
  createQuiz,
  getQuizById,
  getAllQuizzes,
  updateQuiz,
  deleteQuiz,
  shareQuiz,
  getParticipantScores,
  getQuizByIdMiddleware
};
