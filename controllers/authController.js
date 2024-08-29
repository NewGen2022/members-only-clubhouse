const { validationResult } = require('express-validator');
const { createUser } = require('../db/queries');

const addUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('signup', { errors: errors.array() });
    }

    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password1,
    };

    const newUser = await createUser(userData);

    res.status(201).redirect('/login');
};

module.exports = { addUser };
