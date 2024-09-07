const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/auth');
const {
    updateUserToMember,
    updateUserToAdmin,
} = require('../controllers/enhanceStatusController');

// GET ROUTES
router.get('/join-club', isAuth, (req, res) => {
    res.render('./join_club/join-club', { user: req.user, errors: '' });
});

router.get('/join-club/success', isAuth, (req, res) => {
    res.render('./join_club/success', { user: req.user });
});

router.get('/become-admin', isAuth, (req, res) => {
    res.render('./become_admin/become-admin', { user: req.user });
});

// POST ROUTES
router.post('/join-club', isAuth, updateUserToMember);

module.exports = router;
