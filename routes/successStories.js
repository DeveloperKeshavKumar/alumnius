const express = require('express');
const router = express.Router();
const { createSuccessStory, getAllSuccessStories, getSuccessStoryById, updateSuccessStory, deleteSuccessStory } = require('../controllers/successStoryController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, createSuccessStory);
router.get('/', getAllSuccessStories);
router.get('/:id', getSuccessStoryById);
router.patch('/:id', authMiddleware, updateSuccessStory);
router.delete('/:id', authMiddleware, deleteSuccessStory);

module.exports = router;
