const express = require('express');
const router = new express.Router();
const authRouter = require('./auth');
const jobRouter = require('./jobs');
const storiesRouter = require('./successStories');
const eventRouter = require('./event');

router.use("/auth", authRouter);
router.use("/jobs", jobRouter);
router.use("/stories", storiesRouter);
router.use('/events', eventRouter);

module.exports = router;