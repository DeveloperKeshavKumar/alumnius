const express = require('express');
const router = express.Router();
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');
const { authMiddleware, isAlumni } = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, isAlumni, createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.patch('/:id', authMiddleware, isAlumni, updateEvent);
router.delete('/:id', authMiddleware, isAlumni, deleteEvent);

module.exports = router;
