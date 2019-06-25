const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users');

router.post('/signup', UserController.user_signup);

router.post('/signin', UserController.user_signin);

router.delete('/:userId', UserController.user_delete);

module.exports = router;