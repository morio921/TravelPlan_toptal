const Record = require('../models/record.model');
const ROLES = require('../constants/role');
const APIError = require('../utils/api-error');

function create(req, res, next) {
  const record = new Record(req.body);

  return record.save()
    .then((newRecord) => {
      if (!newRecord) {
        throw new APIError('Record is not created', 404);
      }
      res.json(newRecord);
    })
    .catch(next);
}

function update(req, res, next) {
  Object.assign(req.record, req.body);

  return req.record.save()
    .then((updatedRecord) => {
      if (!updatedRecord) {
        throw new APIError('Record is not created', 404);
      }
      res.json(updatedRecord);
    })
    .catch(next);
}

function read(req, res) {
  res.json(req.record);
}

function list(req, res, next) {
  const page_size = parseInt(req.query.page_size);
  const page = parseInt(req.query.page);
  const { userName, fromDate, toDate } = req.query;

  let query = {};
  if(req.user.role === ROLES.USER || req.user.role === ROLES.USER_MANAGER) {
    query['userName'] = req.user.firstName + ' ' + req.user.lastName;
  } else {
    query['userName'] = { $regex: userName ? userName : '', $options: 'i' };
  }

  if(fromDate && toDate)
    query['startDate'] = { $gte: fromDate, $lte: toDate };
  else if(fromDate && !toDate)
    query['startDate'] = { $gte: fromDate };
  else if(!fromDate && toDate)
    query['startDate'] = { $lte: toDate };

  return Record.find(query)
    .skip((page - 1) * page_size)
    .limit(page_size)
    .sort({ startDate: 1 })
    .then((records) => {
      if (!records) {
        throw new APIError('Record is not created', 404);
      }
      Record.find(query)
      .then((newUsers) => {
        res.json({
          "results": records,
          "count": newUsers.length
        });
      })
    })
    .catch(next);
}

function futureList(req, res, next) {
  const page_size = parseInt(req.query.page_size);
  const page = parseInt(req.query.page);

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const nextFirstDay = new Date(year, month, 1);
  const nextLastDay = new Date(year, month + 1, 1);

  let query = { startDate: { $gte: nextFirstDay, $lt: nextLastDay }};
  if(req.user.role === ROLES.USER || req.user.role === ROLES.USER_MANAGER) {
    query['userName'] = req.user.firstName + ' ' + req.user.lastName;
  }

  return Record.find(query)
    .skip((page - 1) * page_size)
    .limit(page_size)
    .sort({ startDate: 1 })
    .then((records) => {
      if (!records) {
        throw new APIError('Record is not created', 404);
      }
      Record.find(query)
      .then((newUsers) => {
        res.json({
          "results": records,
          "count": newUsers.length
        });
      })
    })
    .catch(next);
}

function remove(req, res, next) {
  return req.record.remove()
    .then(() => {
      res.json(req.record._id);
    })
    .catch(next);
}

function getRecordById(req, res, next, id) {
  Record.findById(id)
    .then((record) => {
      if(!record) {
        return new APIError('Record is not created', 404);
      }

      const userName = req.user.firstName + ' ' + req.user.lastName;
      if(record.userName !== userName && req.user.role !== ROLES.ADMIN) {
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
  futureList,
  remove,
  getRecordById,
};
