const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../models/user.model');
const APIError = require('../utils/api-error');

function signIn(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return new APIError('Email and password are required', 401);
  }

  User.findOne({ email })
    .select('_id firstName lastName email password role')
    .exec()
    .then((userItem) => {
      if (!userItem) {
        return new APIError('Your account is not verified', 401);
      }

      return userItem.authenticate(password)
        .then(() => {
          const { _id, firstName, lastName, email, role } = userItem;

          const token = jwt.sign({
            _id, firstName, lastName, email, role
          }, config.jwtSecret, { expiresIn: config.jwtExpires });

          res.json({
            _id, firstName, lastName, email, role, token,
          });
        })
        .catch(() => {
          throw new APIError('Your account is not verified', 401);
        });
    })
    .catch(next);
}

function signUp(req, res, next) {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return new APIError('firstName or lastName or email or password are required', 401);
  }

  const userItem = new User({
    firstName, lastName, email, password
  });

  userItem.save()
    .then((newUserItem) => {
      if (!newUserItem) {
        return new APIError('User not created', 404);
      }
      res.json(newUserItem);
    })
    .catch(next);
}

module.exports = {
  signIn,
  signUp,
};
