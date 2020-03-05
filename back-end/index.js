const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const APIError = require('./api/utils/api-error');
const initializeDB = require('./api/mongoose');
const apiRouter = require('./api/routes');

const app = express();

// initialize db on the top to have models available below
initializeDB();

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(new APIError('API not Found', 404));
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500).json({
    message: err.message,
    stack: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
