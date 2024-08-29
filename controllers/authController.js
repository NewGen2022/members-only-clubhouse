const { validationResult } = require('express-validator');
const { getUserByUsername, createUser } = require('../db/queries');
const e = require('express');

const addUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .render('signup', { errors: errors.array(), prevData: req.body });
    }

    try {
        const isUserExists = await getUserByUsername(req.body.username);

        if (isUserExists) {
            return res.status(400).render('signup', {
                errors: [{ msg: 'Username already exists' }],
                prevData: req.body,
            });
        }

        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password1,
        };

        const newUser = await createUser(userData);

        res.status(201).redirect('/login');
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).render('signup', {
            errors: [{ msg: 'Internal server error, please try again later.' }],
            prevData: req.body,
        });
    }
};

module.exports = { addUser };
