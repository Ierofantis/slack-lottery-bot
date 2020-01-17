const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('../helpers/logger');

// CORS
exports.cors = cors();

// JSON
exports.json = bodyParser.json();

// URLENCODED
exports.urlencoded = bodyParser.urlencoded({ extended: false });

// LOG
exports.log = (req, res, next) => {
  logger.info(`[PRIVACY][HTTP][${req.method}] ${req.originalUrl}`);
  next();
};

// INTERNAL API CALLS AUTHENTICATION (FOR THE UI)
exports.authInternal = (req, res, next) => {
  next();
};

// EXTERNAL API CALLS AUTHENTICATION
exports.authExternal = (req, res, next) => {
  next();
};

// RESPONSE
exports.response = (req, res, next) => {
  res.customError = (error, data) => {
    return res.json({ status: 'error', error: error, data: data });
  };

  res.customSuccess = (data) => {
    return res.json({ status: 'ok', data: data });
  };

  next();
};
