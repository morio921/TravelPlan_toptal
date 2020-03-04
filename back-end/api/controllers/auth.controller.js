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

function signUp(req, res, next) {
  const { firstName, lastName, email, password } = req.body;

  if(!firstName || !lastName || !email || !password) {
    return new APIError('Firstname, lastname, email, or password is required', 401);
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
    const updatedUser = await req.userModel.save();
    if(!updatedUser)
      throw new APIError('User is not updated', 404);
    
    const newUserName = updatedUser.firstName + ' ' + updatedUser.lastName;
    const recordList = await Record.updateMany({ userName: oldUserName}, { userName: newUserName })

    const { _id, firstName, lastName, email, role } = updatedUser;

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
