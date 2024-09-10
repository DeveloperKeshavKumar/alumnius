const express = require('express');
const router = new express.Router();
const authRouter = require('./auth');
const jobRouter = require('./jobs')

router.use("/auth", authRouter);
router.use("/jobs", jobRouter)

module.exports = router;