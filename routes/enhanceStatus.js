const express = require('express');
const router = express.Router();
const { isAuth, isMember, isAdmin } = require('../middleware/auth');
const {
    updateUserToMember,
    updateUserToAdmin,
} = require('../controllers/enhanceStatusController');

// GET ROUTES
router.get('/join-club', isAuth, isMember, (req, res) => {
    res.render('./join_club/join-club', { user: req.user, errors: '' });
});

router.get('/join-club/success', isAuth, isMember, (req, res) => {
    res.render('./join_club/success', { user: req.user });
});

router.get('/become-admin', isAuth, isAdmin, (req, res) => {
    res.render('./become_admin/become-admin', { user: req.user });
});

router.get('/become-admin/success', isAuth, isAdmin, (req, res) => {
    res.render('./become_admin/success', { user: req.user });
});

// POST ROUTES
router.post('/join-club', isAuth, updateUserToMember);

router.post('/become-admin', isAuth, updateUserToAdmin);

module.exports = router;
