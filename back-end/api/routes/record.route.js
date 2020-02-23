const express = require('express');
const recordController = require('../controllers/record.controller');
const ROLES = require('../constants/role');
const checkRole = require('../utils/checkRoles');

const router = express.Router();
router.use(checkRole.checkRoles([ROLES.ADMIN, ROLES.USER]));

router.route('/')
  .get(recordController.list)
  .post(recordController.create);

router.route('/:recordId')
  .get(recordController.read)
  .put(recordController.update)
  .delete(recordController.remove);

router.param('recordId', recordController.getRecordById);

module.exports = router;
