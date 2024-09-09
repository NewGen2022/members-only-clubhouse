const express = require('express');
const router = express.Router();
const {
    main,
    addMsg,
    deleteMsg,
} = require('../controllers/messagesController');
const { isAuth } = require('../middleware/auth');

// GET ROUTES
router.get('/', main);

router.get('/create-msg', isAuth, (req, res) => {
    res.render('create-msg', { user: req.user });
});

// POST ROUTES
router.post('/create-msg', isAuth, addMsg);

router.post('/message/:id/delete', isAuth, deleteMsg);

module.exports = router;
