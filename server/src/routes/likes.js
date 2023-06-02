const express = require('express');
const router = express.Router();

const { userAuth } = require('../middlewares/auth');
const { like } = require('../controllers/version 1.0/likes');

/************************************* CONTROLLER VERSION 1.0 */
router.post('/', userAuth, like)

module.exports = router
