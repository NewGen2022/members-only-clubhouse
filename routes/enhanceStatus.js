const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/auth');

router.get('/join-club', isAuth, (req, res) => {
    res.render('./join_club/join-club', { user: req.user });
});

router.get('/become-admin', isAuth, (req, res) => {
    res.render('./become_admin/become-admin', { user: req.user });
});

module.exports = router;
