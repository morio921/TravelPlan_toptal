const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../models/user.model');

function signIn(req, res, next) {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('_id firstName lastName email password role')
    .exec()
    .then((userItem) => {
      if (!userItem) {
        return res.status(500).json({ message: 'Your account is not verified!' });
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
          res.status(500).json({ message: 'Your account is not verified!' });
        });
    })
    .catch(next);
}

function signUp(req, res, next) {
  const { firstName, lastName, email, password } = req.body;

  const userItem = new User({
    firstName, lastName, email, password
  });

  userItem.save()
    .then((newUserItem) => {
      res.json(newUserItem);
    })
    .catch(next);
}

module.exports = {
  signIn,
  signUp,
};
