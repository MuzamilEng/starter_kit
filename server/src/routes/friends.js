const express = require('express');
const router = express.Router();

const { userAuth } = require('../middlewares/auth');
const { addFriend, removeFriend } = require('../controllers/version 1.0/friends');

/************************************* CONTROLLER VERSION 1.0 */
router.post('/add', userAuth, addFriend);
router.post('/remove', userAuth, removeFriend);

module.exports = router
