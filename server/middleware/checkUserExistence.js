const logger = require('logfilename')(__filename);

const { User, PendingUser } = require('../models');

module.exports = (req, res, next) => {
  const { username, email } = req.body;
  logger.info('Checking for existence of user: ', username);

  return Promise.all([
    PendingUser.findByUsername(username),
    PendingUser.findByEmail(email),
    User.findByUsername(username),
    User.findByEmail(email)
  ])
  .then(resolved => {
    const [
      pendingUsername, pendingEmail, confirmedUsername, confirmedEmail
    ] = resolved;
    if (pendingUsername || confirmedUsername) {
      logger.info('User %s exists.', username);
      req.usernameField = 'username';
      req.user = pendingUsername || confirmedUsername;
      return true;
    } else if (pendingEmail || confirmedEmail) {
      logger.info('User %s exists.', email);
      req.usernameField = 'email';
      req.user = pendingEmail || confirmedEmail;
      return true;
    }
    return false;
  })
  .then(exists => {
    if (exists) {
      return next();
    }
    logger.warn('User %s does not exist. Moving on...', username);
    return next();
  });
};
