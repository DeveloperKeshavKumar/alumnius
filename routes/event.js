const express = require('express');
const router = express.Router();
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');
const auth = require('../middlewares/authMiddleware');

router.post('/create', auth, createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.patch('/:id', auth, updateEvent);
router.delete('/:id', auth, deleteEvent);

module.exports = router;
