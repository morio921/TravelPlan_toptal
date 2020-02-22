const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ROLES = require('../constants/role');

const { Schema } = mongoose;
const SALT_ROUNDS = 10;

const userSchema = new Schema({
  firstName: {
    type: String,
    default: '',
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    default: '',
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    select: false,  //this path should be excluded by default
  },
  role: {
    type: String,
    required: true,
    enum: Object.values(ROLES),
    default: ROLES.USER
  },
}, {
  collection: 'users',
  timestamps: true,
});

userSchema.methods.hashPassword = function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
      if (err) {
        return reject('Failed to generate hash');
      }
      return resolve(hash);
    })
  })
};

userSchema.methods.authenticate = function authenticate(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password)
      .then((allow) => {
        if (!allow) return reject();
        return resolve();
      })
      .catch(reject);
  })
};

userSchema.pre('save', function preSave(next) {
  if (this.password && this.isModified('password')) {
    this.password = this.hashPassword(this.password)
      .then((password) => {
        this.password = password;
        next();
      })
      .catch(next);
  } else {
    next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
