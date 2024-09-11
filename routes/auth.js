const express = require('express');
const router = new express.Router();

const { signup, login, logout } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get("/signup", (req, res) => {
   const userLoggedIn = req.cookies.token ? true : false;
   res.render('signup', { title: 'Sign Up', userLoggedIn });
});
router.get('/login', (req, res) => {
   const userLoggedIn = req.cookies.token ? true : false;
   res.render('login', { title: 'Login', userLoggedIn  });
});
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);

module.exports = router;