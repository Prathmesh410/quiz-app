const express = require('express');
const router = express.Router();
const {addParticipant,getAllParticipants,getParticipantById,updateParticipant,deleteParticipant} = require('../controllers/Participant');

// Add a participant to a quiz
router.post('/quizzes/:quizId/participants', addParticipant);

// Retrieve a participant by their ID
router.get('/participants/:id', getParticipantById);

// Retrieve all participants of a quiz
router.get('/quizzes/:quizId/participants', getAllParticipants);

// Update participant details
router.put('/participants/:id', updateParticipant);

// Delete a participant
router.delete('/participants/:id', deleteParticipant);

module.exports = router;
