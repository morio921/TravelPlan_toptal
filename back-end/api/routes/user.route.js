const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.route('/')
  .post(userController.create)
  .get(userController.list);

router.route('/:userId')
  .get(userController.read)
  .put(userController.update)
  .delete(userController.remove);

router.param('userId', userController.getUserByID);

module.exports = router;
