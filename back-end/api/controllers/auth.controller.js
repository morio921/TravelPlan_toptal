const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../models/user.model');
const Record = require('../models/record.model');
const APIError = require('../utils/api-error');

function signIn(req, res, next) {
  const { email, password } = req.body;

  if(!email || !password) {
    return new APIError('Email and password are required', 401);
  }

  return User.findOne({ email })
    .select('_id firstName lastName email password role')
    .exec()
    .then((userItem) => {
      console.log("auth controller useritem", userItem);
      if (!userItem) {
        throw new APIError('Email address is not correct', 401);
      }

      return userItem.authenticate(password)
        .then(() => {
          const { _id, firstName, lastName, email, role } = userItem;

          const token = jwt.sign({
            _id, firstName, lastName, email, role
          }, config.jwtSecret, { expiresIn: config.jwtExpires });

          res.json({
            info: { _id, firstName, lastName, email, role }, token,
          });
        })
        .catch(() => {
          throw new APIError('Password is not correct', 401);
        });
    })
    .catch(next);
}

function signUp(req, res, next) {
  const { firstName, lastName, email, password } = req.body;

  if(!firstName || !lastName || !email || !password) {
    return new APIError('Firstname, lastname, email, and password are required', 401);
  }

  const userItem = new User({
    firstName, lastName, email, password
  });

  return userItem.save()
    .then((newUserItem) => {
      if (!newUserItem) {
        throw new APIError('User is not created', 404);
      }
      res.json(newUserItem);
    })
    .catch(next);
}

async function updateProfile(req, res, next) {
  const { firstName, lastName, email, password } = req.body;
  const oldUserName = req.userModel.firstName + ' ' + req.userModel.lastName;

  Object.assign(req.userModel, {
    firstName, lastName, email
  });

  if(password) {
    req.userModel.password = password;
  }

  try {
    const updatedUserItem = await req.userModel.save();
    if(!updatedUserItem)
      throw new APIError('User is not updated', 404);
    
    const newUserName = updatedUserItem.firstName + ' ' + updatedUserItem.lastName;
    const recordList = await Record.updateMany({ userName: oldUserName}, { userName: newUserName })

    const { _id, firstName, lastName, email, role } = updatedUserItem;

    const token = jwt.sign({
      _id, firstName, lastName, email, role
    }, config.jwtSecret, { expiresIn: config.jwtExpires });

    return res.json({
      info: { _id, firstName, lastName, email, role }, token,
    });
  } catch(err) {
    return err;
  }
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
  signIn,
  signUp,
  updateProfile,
  getUserByID,
};
