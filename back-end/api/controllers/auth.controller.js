const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../models/user.model');
const Record = require('../models/record.model');
const APIError = require('../utils/api-error');

/**
 * Sign in API (url: '/auth/signin', method: post)
 */
function signIn(req, res, next) {
  const { email, password } = req.body;

  if(!email || !password) {
    throw new APIError('Email and password are required', 400);
  }

  User.findOne({ email })
    .select('_id firstName lastName email password role')
    .exec()
    .then((user) => {
      if (!user) {
        throw new APIError('Email or password is not correct', 401);
      }

      return user.authenticate(password)
        .then(() => {
          const { _id, firstName, lastName, email, role } = user;

          const token = jwt.sign({
            _id, firstName, lastName, email, role
          }, config.jwtSecret, { expiresIn: config.jwtExpires });

          res.json({
            info: { _id, firstName, lastName, email, role }, token,
          });
        })
        .catch(() => {
          throw new APIError('Email or password is not correct', 401);
        });
    })
    .catch(next);
}

/**
 * Sign up API (url: '/auth/signup', method: post)
 */
function signUp(req, res, next) {
  const { firstName, lastName, email, password } = req.body;

  if(!firstName || !lastName || !email || !password) {
    throw new APIError('Firstname, lastname, email, or password is required', 400);
  }

  if(firstName.indexOf(' ') >= 0 || lastName.indexOf(' ') >= 0) {
    throw new APIError('FirstName or lastName can not include whitespace', 400);
  }

  User.findOne({ email })
  .then((oldUser) => {
    if(oldUser) {
      throw new APIError('This email is already exist!', 400);
    }

    const user = new User({
      firstName, lastName, email, password
    });
  
    return user.save()
      .then((newUser) => {
        if (!newUser) {
          throw new APIError('User is not created', 404);
        }
        res.json(newUser);
      })
      .catch(next);
  })
  .catch(next);
}

/**
 * Update the logged-in user's profile (url: '/auth/profile/:userId', method: put)
 */
function updateProfile(req, res, next) {
  const { firstName, lastName, email, password } = req.body;
  const oldUserName = req.userModel.firstName + ' ' + req.userModel.lastName;

  Object.assign(req.userModel, {
    firstName, lastName, email
  });

  if(password) {
    req.userModel.password = password;
  }

  req.userModel.save()
  .then((updatedUser) => {
    if(!updatedUser)
      throw new APIError('User is not updated', 404);
    
    const newUserName = updatedUser.firstName + ' ' + updatedUser.lastName;
    Record.updateMany({ userName: oldUserName}, { userName: newUserName })
      .then(() => {
        const { _id, firstName, lastName, email, role } = updatedUser;

        const token = jwt.sign({
          _id, firstName, lastName, email, role
        }, config.jwtSecret, { expiresIn: config.jwtExpires });

        res.json({
          info: { _id, firstName, lastName, email, role }, token,
        });
      })
      .catch(next);
  })
  .catch(next);
}

/**
 * Get user by user id ('/:userId')
 */
function getUserByID(req, res, next, id) {
  User.findById(id)
  .then((user) => {
    if(!user) {
      return new APIError('User is not founded', 404);
    }
    req.userModel = user;
    next();
  })
  .catch(next);
}

module.exports = {
  signIn,
  signUp,
  updateProfile,
  getUserByID,
};
