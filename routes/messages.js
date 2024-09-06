const express = require('express');
const router = express.Router();
const { main } = require('../controllers/messagesController');
const { isAuth } = require('../middleware/auth');

// GET ROUTES
router.get('/', main);

router.get('/create-msg', isAuth, (req, res) => {
    res.render('create-msg', { user: req.user });
});

module.exports = router;
