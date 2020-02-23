const Record = require('../models/record.model');
const ROLES = require('../constants/role');
const APIError = require('../utils/api-error');

function create(req, res, next) {
  const recordItem = new Record(req.body);

  recordItem.save()
    .then((newRecordItem) => {
      if (!newRecordItem) {
        return new APIError('Record not created', 404);
      }
      res.json(newRecordItem);
    })
    .catch(next);
}

function update(req, res, next) {
  Object.assign(req.record, req.body);

  req.record.save()
    .then((updatedRecordItem) => {
      if (!updatedRecordItem) {
        return new APIError('Record not created', 404);
      }
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
      if (!recordList) {
        return new APIError('Record not created', 404);
      }
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
        return new APIError('Record not created', 404);
      }

      if(recordItem.user.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
        return new APIError('User is not authorized to access this record', 403);
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
