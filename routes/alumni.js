const express = require('express');
const router = express.Router();
const { getUserProfile, getAllAlumnis, getAlumniById, connectWithAlumni, removeConnection } = require('../controllers/alumniController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/profile/:id', getUserProfile);
router.get('/', getAllAlumnis);
router.get('/:id', authMiddleware, getAlumniById);
router.patch('/connect/:id', authMiddleware, connectWithAlumni);
router.delete('/disconnect/:id', authMiddleware, removeConnection);

module.exports = router;
