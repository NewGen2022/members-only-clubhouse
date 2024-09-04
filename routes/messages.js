const express = require('express');
const router = express.Router();

// GET routes
router.get('/', (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    res.render('index', { isAuthenticated: isAuthenticated, user: req.user });
});

module.exports = router;
