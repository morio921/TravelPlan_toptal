const express = require('express');
const expressJwt = require('express-jwt');
const config = require('../../config');
const authRoute = require('./auth.route');
const recordRoute = require('./record.route');

const router = express.Router();

const authMiddleware = expressJwt({ secret: config.jwtSecret });

router.use('/auth', authRoute);
router.use('/record', authMiddleware, recordRoute);

module.exports = router;
