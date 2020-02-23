const User = require('../models/user.model');
const ROLES = require('../constants/role');

function create(req, res, next) {
  const { firstName, lastName, email, password, role } = req.body;

  console.error("user create");

  const user = new User({
    firstName, lastName, email, password
  });

  if ((req.user.role === ROLES.ADMIN || req.user.role === ROLES.USER_MANAGER) && role) {
    user.role = role;
  }

  user.save()
    .then((newUserItem) => {
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
      res.status(404).json({ message: 'User not found' });
      return;
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
      res.status(404).json({ message: 'User not found' });
      return;
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
