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
    
      const shareableLink = `http://localhost:8000/api/quizzes/${quizId}`;
  
      res.json({ shareableLink });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate the shareable link' });
    }
  };

  const getSharedQuiz = async (req, res) => {
    try {
      const shareableLink = req.params.link;
  
      // Find the quiz by the shared link
      const quiz = await Quiz.findOne({ shareableLink });
  
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
  
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve the quiz' });
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

module.exports = {
  createQuiz,
  getQuizById,
  getAllQuizzes,
  updateQuiz,
  deleteQuiz,
  shareQuiz,
  getSharedQuiz,
  getParticipantScores
};
