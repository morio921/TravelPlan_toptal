const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.route('/signin')
  .post(authController.signIn);

router.route('/signup')
  .post(authController.signUp);

router.route('/profile/:userId')
  .put(authController.updateProfile);

router.param('userId', authController.getUserByID);

module.exports = router;
