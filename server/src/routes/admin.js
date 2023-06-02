const express = require('express')
const router = express.Router()

const { adminAuth } = require('../middlewares/auth')
const adminApis2 = require('../controllers/version 2.0/admin');
const validate = require('../middlewares/validate');
const adminValidation = require('../validations/admin');

/************************************* CONTROLLER VERSION 2.0 */
// ADMIN AUTH
router.post('/signup', validate(adminValidation.signup), adminApis2.signup);
router.post('/login', validate(adminValidation.login), adminApis2.login);
router.put('/admin', adminAuth, validate(adminValidation.updateAdmin), adminApis2.updateAdmin);

// User operations
router.get('/users', validate(adminValidation.getUsers), adminApis2.getUsers);
router.post('/award-diamonds/:id', validate(adminValidation.getUsers), adminApis2.awardDiamonds);



module.exports = router
