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
  let 
}
