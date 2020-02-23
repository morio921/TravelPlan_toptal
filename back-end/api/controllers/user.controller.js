const User = require('../models/user.model');
const ROLES = require('../constants/role');
const APIError = require('../utils/api-error');

function create(req, res, next) {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password || !role) {
    return new APIError('firstName or lastName or email or password or role are required', 401);
  }

  const user = new User({
    firstName, lastName, email, password
  });

  if ((req.user.role === ROLES.ADMIN || req.user.role === ROLES.USER_MANAGER) && role) {
    user.role = role;
  }

  user.save()
    .then((newUserItem) => {
      if (!newUserItem) {
        return new APIError('User not created', 404);
      }
      res.json(newUserItem);
    })
    .catch(next);
}

function update(req, res, next) {
  const { firstName, lastName, email, password, role } = req.body;

  Object.assign(req.userModel, {
    firstName, lastName, email
  });

  if (password) {
    req.userModel.password = password;
  }

  if (req.user.role === ROLES.ADMIN && role) {
    req.userModel.role = role;
  }

  req.userModel.save()
    .then((updatedUserItem) => {
      if (!updatedUserItem) {
        return new APIError('User not created', 404);
      }
      res.json(updatedUserItem);
    })
    .catch(next);
}

function read(req, res) {
  res.json(req.userModel);
}

function list(req, res, next) {
  let query = {};
  if (req.user.role === ROLES.MANAGER) {
    query = { role: { $ne: ROLES.ADMIN } };
  }

  User.find(query)
    .then((userList) => {
      if (!userList) {
        return new APIError('User not created', 404);
      }
      res.json(userList);
    })
    .catch(next);
}

function remove(req, res, next) {
  req.userModel.remove(() => {
    res.json(req.userModel);
  })
  .catch(next);
}

function getUserByID(req, res, next, id) {
  User.findById(id)
  .then((userItem) => {
    if (!userItem) {
      return new APIError('User not created', 404);
    }
    req.userModel = userItem;
    next();
  })
  .catch(next);
}

function getProfile(req, res, next) {
  User.findById(req.user._id)
  .then((userItem) => {
    if (!userItem) {
      return new APIError('User not created', 404);
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
  getProfile,
};
