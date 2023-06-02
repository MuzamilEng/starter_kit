const express = require('express');
const router = express.Router();

const { userAuth } = require('../middlewares/auth');
const { createComment, editComment } = require('../controllers/version 1.0/comments');

/************************************* CONTROLLER VERSION 1.0 */
router.post('/', userAuth, createComment);
router.patch('/:commentId', userAuth, editComment);

module.exports = router
