const { validationResult } = require('express-validator');
const { createUser } = require('../db/queries');

const addUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .render('signup', { errors: errors.array(), prevData: req.body });
    }

    try {
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
