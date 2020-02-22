const mongoose = require('mongoose');
const fs = require('fs');
const config = require('../config');

const initializeMongo = () => {
  mongoose.connect(
    config.mongoURL,
    { useNewUrlParser: true, useCreateIndex: true },
    err => {
      if(err) {
        console.error('Unable to connect MongoDB');
        throw err;
      }

      console.log('Connected to MongoDB');
    }
  );

  const modelPath = `${__dirname}/models`;

  fs.readdirSync(modelPath).forEach(file => {
    require(`${modelPath}/${file}`);
  });
};

module.exports = initializeMongo;
