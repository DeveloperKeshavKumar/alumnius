const express = require('express');
const router = new express.Router();
const authRouter = require('./auth');

router.use("/auth", authRouter);

module.exports = router;