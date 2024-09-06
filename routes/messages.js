const express = require('express');
const router = express.Router();
const { getAllMessages } = require('../db/queries');
const { formatDate } = require('../public/js/utils');

// GET ROUTES
router.get('/', async (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    const messages = await getAllMessages();
    res.render('index', {
        isAuthenticated: isAuthenticated,
        messages: messages,
        user: req.user,
        formatDate: formatDate,
    });
});

module.exports = router;
