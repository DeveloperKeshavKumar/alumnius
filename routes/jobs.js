const express = require('express');
const router = new express.Router();

const { createJobPosting, getAllJobPostings, getJobPostingById, updateJobPosting, deleteJobPosting } = require('../controllers/jobController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, createJobPosting);
router.get('/', getAllJobPostings);
router.get('/:id', getJobPostingById);
router.patch('/:id', authMiddleware, updateJobPosting);
router.delete('/:id', authMiddleware, deleteJobPosting);

module.exports = router;
