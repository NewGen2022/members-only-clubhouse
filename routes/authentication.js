const express = require('express');
const router = express.Router();
const { addUser } = require('../controllers/authController');
const { validateSignUp } = require('../middleware/validation.js');

// GET routes
router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup', { prevData: req.body || {} });
});

// POST routes
router.post('/signup', validateSignUp, addUser);

module.exports = router;
