const express = require('express');
const router = express.Router();
const passport = require('passport');
const { addUser } = require('../controllers/authController');
const { validateSignUp } = require('../middleware/validation.js');

// GET routes
router.get('/login', (req, res) => {
    res.render('login', {
        messages: req.flash('error'),
        user: req.user,
    });
});

router.get('/signup', (req, res) => {
    res.render('signup', {
        errors: [],
        prevData: req.body || {},
        user: req.user,
    });
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.status(302).redirect('/');
    });
});

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
