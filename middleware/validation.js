const { body } = require('express-validator');
const { getUserByUsername } = require('../db/queries');

const validateSignUp = [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3, max: 20 })
        .withMessage('Username must be between 3 and 20 characters long')
        .custom(async (value) => {
            const isUserExists = await getUserByUsername(value);

            if (isUserExists) {
                throw new Error('Username already exists');
            }
        }),
    body('password1')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('password2').custom((value, { req }) => {
        if (value !== req.body.password1) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
];

module.exports = { validateSignUp };
