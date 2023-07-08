const express = require('express');
const router = express.Router();
const {addParticipant,getAllParticipants,getParticipantById,updateParticipant,deleteParticipant} = require('../controllers/Participant');

router.post('/quizzes/:quizId/participants', addParticipant);
router.get('/participants/:id', getParticipantById);
router.get('/quizzes/:quizId/participants', getAllParticipants);
router.put('/participants/:id', updateParticipant);
router.delete('/:quizId/participants/:id', deleteParticipant);

module.exports = router;
