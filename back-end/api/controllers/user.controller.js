const User = require('../models/user.model');
const Record = require('../models/record.model');
const ROLES = require('../constants/role');
const APIError = require('../utils/api-error');

/**
 * Create a new user (url: '/user', method: post)
 */
function create(req, res, next) {
  const { firstName, lastName, email, password, role } = req.body;

  if(!firstName || !lastName || !email  || !password || !role) {
    throw new APIError('Firstname, lastname, email, password, or role is required', 400);
  }

  if(req.user.role === ROLES.USER) {
    throw new APIError('Regular User can not create a new user', 400);
  }

  const user = new User({
    firstName, lastName, email, password
  });

  if ((req.user.role === ROLES.ADMIN || req.user.role === ROLES.USER_MANAGER) && role) {
    user.role = role;
  }

  user.save()
    .then((newUser) => {
      if (!newUser) {
        throw new APIError('User is not created', 404);
      }
      res.json(newUser);
    })
    .catch(next);
}

/**
 * Update a user (url: '/user/:userId', method: put)
 */
function update(req, res, next) {
  const { firstName, lastName, email, password, role } = req.body;
  const oldUserName = req.userModel.firstName + ' ' + req.userModel.lastName;

  if(req.user.role === ROLES.USER) {
    throw new APIError('Regular User can not update a user', 400);
  }

  Object.assign(req.userModel, {
    firstName, lastName, email
  });

  if(password) {
    req.userModel.password = password;
  }

  if((req.user.role === ROLES.ADMIN || req.user.role === ROLES.USER_MANAGER) && role) {
    req.userModel.role = role;
  }

  req.userModel.save()
    .then((updatedUser) => {
      if(!updatedUser) {
        throw new APIError('User is not updated', 404);
      }
      const newUserName = updatedUser.firstName + ' ' + updatedUser.lastName;
      Record.updateMany({ userName: oldUserName}, { userName: newUserName })
        .then(() => {
          res.json(updatedUser);
        })
        .catch(next);
    })
    .catch(next);
}

/**
 * Read a user information (url: '/user/:userId', method: get)
 */
function read(req, res) {
  res.json(req.userModel);
}

/**
 * Read all user (url: '/user', method: get)
 */
function list(req, res, next) {
  const page_size = parseInt(req.query.page_size);
  const page = parseInt(req.query.page);

  if(req.user.role === ROLES.USER) {
    throw new APIError('Regular User can not get the user list', 400);
  }

  let query = {};
  if(req.user.role === ROLES.MANAGER) {
    // For getting users except admin users
    query = { role: { $ne: ROLES.ADMIN } };
  }

  User.find(query)
    .skip((page - 1) * page_size)
    .limit(page_size)
    .then((users) => {
      if(!users) {
        throw new APIError('Users are not founded', 404);
      }
      User.find(query)
      .then((newUsers) => {
        res.json({
          "results": users,
          "count": newUsers.length
        });
      })
    })
    .catch(next);
}

/**
 * Remove a user (url: '/user/:userId', method: delete)
 */
function remove(req, res, next) {
  if(req.user.role === ROLES.USER) {
    throw new APIError('Regular User can not delete the user', 400);
  }

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

/**
 * Get a user information by user id (url: '/:userId')
 */
function getUserByID(req, res, next, id) {
  User.findById(id)
  .then((user) => {
    if(!user) {
      throw new APIError('User is not founded', 404);
    }
    req.userModel = user;
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
