const User = require('../models/user.model');
const ROLES = require('../constants/role');
const APIError = require('../utils/api-error');

async function create(req, res, next) {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email  || !password || !role) {
    return new APIError('Firstname, lastname, email, password, or role are required', 401);
  }

  const user = new User({
    firstName, lastName, email, password
  });

  if ((req.user.role === ROLES.ADMIN || req.user.role === ROLES.USER_MANAGER) && role) {
    user.role = role;
  }

  await user.save()
    .then((newUserItem) => {
      if (!newUserItem) {
        return new APIError('User not created', 404);
      }
      res.json(newUserItem);
    })
    .catch(next);
}

async function update(req, res, next) {
  const { firstName, lastName, email, password, role } = req.body;

  Object.assign(req.userModel, {
    firstName, lastName, email
  });

  if (password) {
    req.userModel.password = password;
  }

  if ((req.user.role === ROLES.ADMIN || req.user.role === ROLES.USER_MANAGER) && role) {
    req.userModel.role = role;
  }

  await req.userModel.save()
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

async function list(req, res, next) {
  const page_size = parseInt(req.query.page_size);
  const page = parseInt(req.query.page);

  let query = {};
  if (req.user.role === ROLES.MANAGER) {
    query = { role: { $ne: ROLES.ADMIN } };   //For getting users except admin users
  }

  await User.find(query)
    .skip((page - 1) * page_size)
    .limit(page_size)
    .then((userList) => {
      if (!userList) {
        return new APIError('User not created', 404);
      }
      User.find(query)
      .then((newList) => {
        res.json({"results": userList, "count": newList.length});
      })
    })
    .catch(next);
}

async function remove(req, res, next) {
  await req.userModel.remove()
    .then(() => {
      res.json(req.userModel._id);
    })
    .catch(next);
}

async function getUserByID(req, res, next, id) {
  await User.findById(id)
  .then((userItem) => {
    if (!userItem) {
      return new APIError('User not created', 404);
    }
    req.userModel = userItem;
    next();
  })
  .catch(next);
}

async function getProfile(req, res, next) {
  await User.findById(req.user._id)
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
