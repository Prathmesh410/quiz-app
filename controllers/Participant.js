const Participant = require('../models/Participant');
const Quiz = require('../models/Quiz');
const addParticipant = async (req, res) => {
  try {
    const {  name, email } = req.body;
    const quizId = req.params.quizId;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    // Create the participant
    const newParticipant = await Participant.create({
      quizId,
      name,
      email
    });
    quiz.participants.push(newParticipant._id);
    await quiz.save();
    res.status(201).json(newParticipant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add the participant' });
  }
};

const getParticipantById = async (req, res) => {
    try {
      const participantId = req.params.id;
      
      // Find the participant by their ID
      const participant = await Participant.findById(participantId);
  
      if (!participant) {
        return res.status(404).json({ error: 'Participant not found' });
      }
  
      res.json(participant);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve the participant' });
    }
  };

  const getAllParticipants = async (req, res) => {
    try {
      const quizId = req.params.quizId;
      
      // Find all participants of the quiz
      const participants = await Participant.find({ quizId });
  
      res.json(participants);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve the participants' });
    }
  };
  
  const updateParticipant = async (req, res) => {
    try {
      const participantId = req.params.id;
      const { name, email } = req.body;
  
      // Find and update the participant
      const updatedParticipant = await Participant.findByIdAndUpdate(
        participantId,
        { name, email },
        { new: true }
      );
  
      if (!updatedParticipant) {
        return res.status(404).json({ error: 'Participant not found' });
      }
  
      res.json(updatedParticipant);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update the participant' });
    }
  };

  const deleteParticipant = async (req, res) => {
    try {
      const participantId = req.params.id;
      const quizId = req.params.quizId;
      const quiz = await Quiz.findById(quizId);

      const deletedParticipant = await Participant.findByIdAndDelete(participantId);
  
      if (!deletedParticipant) {
        return res.status(404).json({ error: 'Participant not found' });
      }
      quiz.participants = quiz.participants.filter(id => id.toString() !== participantId);
      await quiz.save();
      res.json({ message: 'Participant deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete the participant' });
    }
  };

module.exports = {
  addParticipant,
  deleteParticipant,
  updateParticipant,
  getAllParticipants,
  getParticipantById
};
