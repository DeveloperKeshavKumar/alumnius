const express = require('express');
const router = new express.Router();

const authRouter = require('./auth');
const jobRouter = require('./jobs');
const storiesRouter = require('./successStories');
const eventRouter = require('./event');
const alumniRouter = require('./alumni');

router.use("/auth", authRouter);
router.use("/jobs", jobRouter);
router.use("/stories", storiesRouter);
router.use('/events', eventRouter);
router.use('/alumnis', alumniRouter);

module.exports = router;