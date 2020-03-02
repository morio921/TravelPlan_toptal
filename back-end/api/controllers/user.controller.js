const User = require('../models/user.model');
const Record = require('../models/record.model');
const ROLES = require('../constants/role');
const APIError = require('../utils/api-error');

function create(req, res, next) {
  const { firstName, lastName, email, password, role } = req.body;

  if(!firstName || !lastName || !email  || !password || !role) {
    return new APIError('Firstname, lastname, email, password, or role is required', 401);
  }

  const user = new User({
    firstName, lastName, email, password
  });

  if ((req.user.role === ROLES.ADMIN || req.user.role === ROLES.USER_MANAGER) && role) {
    user.role = role;
  }

  return user.save()
    .then((newUserItem) => {
      if (!newUserItem) {
        throw new APIError('User is not created', 404);
      }
      res.json(newUserItem);
    })
    .catch(next);
}

function update(req, res, next) {
  const { firstName, lastName, email, password, role } = req.body;
  const oldUserName = req.userModel.firstName + ' ' + req.userModel.lastName;

  Object.assign(req.userModel, {
    firstName, lastName, email
  });

  if(password) {
    req.userModel.password = password;
  }

  if((req.user.role === ROLES.ADMIN || req.user.role === ROLES.USER_MANAGER) && role) {
    req.userModel.role = role;
  }

  return req.userModel.save()
    .then((updatedUserItem) => {
      if(!updatedUserItem) {
        throw new APIError('User is not updated', 404);
      }
      const newUserName = updatedUserItem.firstName + ' ' + updatedUserItem.lastName;
      Record.updateMany({ userName: oldUserName}, { userName: newUserName })
        .then(() => {
          res.json(updatedUserItem);
        })
        .catch(next);
    })
    .catch(next);
}

function read(req, res) {
  res.json(req.userModel);
}

function list(req, res, next) {
  const page_size = parseInt(req.query.page_size);
  const page = parseInt(req.query.page);

  let query = {};
  if(req.user.role === ROLES.MANAGER) {
    query = { role: { $ne: ROLES.ADMIN } };   //For getting users except admin users
  }

  return User.find(query)
    .skip((page - 1) * page_size)
    .limit(page_size)
    .then((userList) => {
      if(!userList) {
        throw new APIError('Users are not founded', 404);
      }
      User.find(query)
      .then((newList) => {
        res.json({"results": userList, "count": newList.length});
      })
    })
    .catch(next);
}

function remove(req, res, next) {
  req.userModel.remove()
    .then(() => {
      const userFullName = req.userModel.firstName + ' ' + req.userModel.lastName;
      Record.remove({ userName: userFullName })
      .then(() => {
        res.json(req.userModel._id);
      })
      .catch(next);
    })
    .catch(next);
}

function getUserByID(req, res, next, id) {
  User.findById(id)
  .then((userItem) => {
    if(!userItem) {
      return new APIError('User is not founded', 404);
    }
    req.userModel = userItem;
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
  getUserByID,
};
