const express = require('express');
const router = new express.Router();

const { createJobPosting, getAllJobPostings, getJobPostingById, updateJobPosting, deleteJobPosting } = require('../controllers/jobController');
const { authMiddleware, isAlumni } = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, isAlumni, createJobPosting);
router.get('/', getAllJobPostings);
router.get('/:id', getJobPostingById);
router.patch('/:id', authMiddleware, isAlumni, updateJobPosting);
router.delete('/:id', authMiddleware, isAlumni, deleteJobPosting);

module.exports = router;
