const Record = require('../models/record.model');
const ROLES = require('../constants/role');
const APIError = require('../utils/api-error');

async function create(req, res, next) {
  const recordItem = new Record(req.body);

  await recordItem.save()
    .then((newRecordItem) => {
      if (!newRecordItem) {
        return new APIError('Record not created', 404);
      }
      res.json(newRecordItem);
    })
    .catch(next);
}

async function update(req, res, next) {
  Object.assign(req.record, req.body);

  await req.record.save()
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

async function list(req, res, next) {
  const page_size = parseInt(req.query.page_size);
  const page = parseInt(req.query.page);
  const { userName, fromDate, toDate } = req.query;

  let query = {};
  if (req.user.role === ROLES.USER) {
    query = { user: req.user._id };
  }

  query['userName'] = { $regex: userName ? userName : '', $options: 'i' };

  if(fromDate && toDate)
    query['startDate'] = { $gte: fromDate, $lte: toDate };
  else if(fromDate && !toDate)
    query['startDate'] = { $gte: fromDate };
  else if(!fromDate && toDate)
    query['startDate'] = { $lte: toDate };

  await Record.find(query)
    .skip((page - 1) * page_size)
    .limit(page_size)
    .then((recordList) => {
      if (!recordList) {
        return new APIError('Record not created', 404);
      }
      Record.find(query)
      .then((newList) => {
        res.json({"results": recordList, "count": newList.length});
      })
    })
    .catch(next);
}

async function remove(req, res, next) {
  await req.record.remove(() => {
    res.json(req.record._id);
  })
  .catch(next);
}

async function getRecordById(req, res, next, id) {
  await Record.findById(id)
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
