const express = require('express');
const router = new express.Router();

const { signup, login, logout } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get("/signup",(req, res) => {
   res.render('signup', { title: 'Sign Up' });
});
router.get('/login', (req, res) => {
   res.render('login', { title: 'Login' });
});
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);

module.exports = router;