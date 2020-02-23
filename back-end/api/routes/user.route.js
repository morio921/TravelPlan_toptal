const express = require('express');
const userController = require('../controllers/user.controller');
const ROLES = require('../constants/role');
const checkRole = require('../utils/checkRoles');

const router = express.Router();

router.use(checkRole.checkRoles([ROLES.ADMIN, ROLES.USER_MANAGER]));

router.route('/')
  .post(userController.create)
  .get(userController.list);

router.route('/:userId')
  .get(userController.read)
  .put(userController.update)
  .delete(userController.remove);

router.param('userId', userController.getUserByID);

module.exports = router;
