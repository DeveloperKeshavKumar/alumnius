const express = require('express');
const router = new express.Router();

router.get("/signup", (req, res) => {
   res.send('Signup page');
});

module.exports = router;