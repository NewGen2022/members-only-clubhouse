const express = require('express');
const router = express.Router();
const { main } = require('../controllers/messagesController');

// GET ROUTES
router.get('/', main);

module.exports = router;
