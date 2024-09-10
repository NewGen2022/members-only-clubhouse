const { validationResult } = require('express-validator');
const { createUser } = require('../db/queries');
const bcrypt = require('bcryptjs');

const addUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('signup', {
            errors: errors.array() || {},
            prevData: req.body || {},
            user: req.user,
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password1, 10);

        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: hashedPassword,
        };

        const newUser = await createUser(userData);

        res.status(201).redirect('/login');
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).render('signup', {
            errors: [{ msg: 'Internal server error, please try again later.' }],
            prevData: req.body || {},
            user: req.user,
        });
    }
};

const logIn = (req, res) => {
    res.render('login', {
        errors: req.flash('error'),
        user: req.user,
    });
};

const signUp = (req, res) => {
    res.render('signup', {
        errors: [],
        prevData: req.body || {},
        user: req.user,
    });
};

const logOut = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
};

module.exports = { addUser, logIn, signUp, logOut };
