const Record = require('../models/record.model');
const ROLES = require('../constants/role');
const APIError = require('../utils/api-error');

/**
 * Create a new record (url: '/record', method: post)
 */
function create(req, res, next) {
  const record = new Record(req.body);

  record.save()
    .then((newRecord) => {
      if (!newRecord) {
        throw new APIError('Record is not created', 404);
      }
      res.json(newRecord);
    })
    .catch(next);
}

/**
 * Update a record by record ID (url: '/record/:recordId', method: put)
 */
function update(req, res, next) {
  Object.assign(req.record, req.body);

  req.record.save()
    .then((updatedRecord) => {
      if (!updatedRecord) {
        throw new APIError('Record is not created', 404);
      }
      res.json(updatedRecord);
    })
    .catch(next);
}

/**
 * Read a record by record ID (url: '/record/:recordId', method: get)
 */
function read(req, res) {
  res.json(req.record);
}

/**
 * Read all records by filtering and pagination variables (url: '/record', method: get)
 */
function list(req, res, next) {
  const { userName, fromDate, toDate } = req.query;
  const page_size = parseInt(req.query.page_size);
  const page = parseInt(req.query.page);

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

  Record.find(query)
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

/**
 * Read records for the next month using pagination variables (url: '/record/future', method: get)
 */
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

  Record.find(query)
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

/**
 * Remove a record by record ID (url: '/record/:recordId', method: delete)
 */
function remove(req, res, next) {
  req.record.remove()
    .then(() => {
      res.json(req.record._id);
    })
    .catch(next);
}

/**
 * Get a record (url: '/:recordId')
 */
function getRecordById(req, res, next, id) {
  Record.findById(id)
    .then((record) => {
      if(!record) {
        throw new APIError('Record is not created', 404);
      }

      const userName = req.user.firstName + ' ' + req.user.lastName;
      if(record.userName !== userName && req.user.role !== ROLES.ADMIN) {
        throw new APIError('User is not authorized to access this record', 403);
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
