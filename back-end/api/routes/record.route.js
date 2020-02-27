const express = require('express');
const recordController = require('../controllers/record.controller');

const router = express.Router();

router.route('/')
  .get(recordController.list)
  .post(recordController.create);

router.route('/future')
  .get(recordController.futureList);

router.route('/:recordId')
  .get(recordController.read)
  .put(recordController.update)
  .delete(recordController.remove);

router.param('recordId', recordController.getRecordById);

module.exports = router;
