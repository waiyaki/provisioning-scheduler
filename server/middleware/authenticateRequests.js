const jwt = require('jsonwebtoken');
const logger = require('logfilename')(__filename);

const config = require('../config');
const { User } = require('../models');
const { handleErrors } = require('../utils');

module.exports = (req, res, next) => {
  const token = req.body.token ||
    req.params.token ||
    req.headers['x-access-token'];

  if (!token) {
    return res.status(401).send({
      message: 'No access token provided.'
    });
  }

  return jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Failed to authenticate token.'
      });
    }

    // PendingUser accounts don't have access to the protected areas of the API.
    return User.findById(decoded.id)
      .then(
        verifiedUser => {
          if (!verifiedUser) {
            return res.status(401).send({
              message: 'Invalid token. Please log in again'
            });
          }
          req.user = verifiedUser;
          return next();
        },
        error => {
          logger.error('Error finding user (User): ', decoded);
          return handleErrors.resolve(res, error);
        }
      );
  });
};
