let express = require('express');
let router = express.Router();
let usersController = require('../controllers/user');
let authController = require('../controllers/auth');

/* GET users listing. */

router.get('/profile', authController.requireAuth, usersController.myprofile);

router.post('/profile', authController.requireAuth, usersController.updateProfile);

router.post('/signup', usersController.signup);

router.post('/login', usersController.signin);

module.exports = router;