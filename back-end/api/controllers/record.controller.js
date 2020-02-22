const mongoose = require('mongoose');
const Record = require('../models/record.model');
const ROLES = require('../constants/role');

function create(req, res, next) {
  const recordItem = new Record(req.body);

  recordItem.save()
    .then((newRecordItem) => {
      res.json(newRecordItem);
    })
    .catch(next);
}

function update(req, res, next) {
  Object.assign(req.record, req.body);

  req.record.save()
    .then((updatedRecordItem) => {
      res.json(updatedRecordItem);
    })
    .catch(next);
}

function read(req, res) {
  res.json(req.record);
}

function list(req, res, next) {
  let query = {};
  if (req.user.role === ROLES.USER) {
    query = { user: req.user._id };
  }

  Record.find(query)
    .populate('user')
    .then((recordList) => {
      res.json(recordList);
    })
    .catch(next);
}

function remove(req, res, next) {
  req.record.remove(() => {
    res.json(req.record);
  })
  .catch(next);
}

function getRecordById(req, res, next, id) {
  Record.findById(id)
    .then((recordItem) => {
      if (!recordItem) {
        res.status(404).json({ message: 'Record not found' });
        return;
      }

      if(recordItem.user.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
        res.status(403).json({ message: 'User is not authorized to access this record' });
        return;
      }

      req.record = record;
      next();
    })
    .catch(next);
}

module.exports = {
  create,
  update,
  read,
  list,
  remove,
  getRecordById,
};
