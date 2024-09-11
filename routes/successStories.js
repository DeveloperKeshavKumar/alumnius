const express = require('express');
const router = express.Router();
const { createSuccessStory, getAllSuccessStories, getSuccessStoryById, updateSuccessStory, deleteSuccessStory } = require('../controllers/successStoryController');
const { authMiddleware, isAlumni } = require('../middlewares/authMiddleware');

router.get('/create', (req, res) => {
   res.render('storyCreate');
});
router.post('/create', authMiddleware, isAlumni, createSuccessStory);
router.get('/', getAllSuccessStories);
router.get('/:id', getSuccessStoryById);
router.patch('/:id', authMiddleware, isAlumni, updateSuccessStory);
router.post('/:id', authMiddleware, isAlumni, deleteSuccessStory);

module.exports = router;
