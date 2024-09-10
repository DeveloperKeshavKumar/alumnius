const express = require('express');
const router = express.Router();
const { createSuccessStory, getAllSuccessStories, getSuccessStoryById, updateSuccessStory, deleteSuccessStory } = require('../controllers/successStoryController');
const { authMiddleware, isAlumni } = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, isAlumni, createSuccessStory);
router.get('/', getAllSuccessStories);
router.get('/:id', getSuccessStoryById);
router.patch('/:id', authMiddleware, isAlumni, updateSuccessStory);
router.delete('/:id', authMiddleware, isAlumni, deleteSuccessStory);

module.exports = router;
