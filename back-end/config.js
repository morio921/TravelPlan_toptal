const dotenv = require('dotenv');

try {
  dotenv.config();
} catch (e) {
  console.log(e);
}

module.exports = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/joggingtrack',
  jwtSecret: process.env.JWT_SECRET || 'moriodev',
  jwtExpires: process.env.JWT_EXPIRES || '30d',
}
