const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
    addUser,
    logIn,
    signUp,
    logOut,
} = require('../controllers/authController');
const { validateSignUp } = require('../middleware/validation.js');

// GET routes
router.get('/login', logIn);

router.get('/signup', signUp);

router.get('/logout', logOut);

// POST routes
router.post('/signup', validateSignUp, addUser);

router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    })
);

module.exports = router;
