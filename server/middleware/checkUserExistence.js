const logger = require('logfilename')(__filename);

const { User, PendingUser } = require('../models');

module.exports = (req, res, next) => {
  const username = req.body.username || req.body.email;
  const usernameField = req.body.username ? 'username' : 'email';
  req.usernameField = usernameField;
  logger.info('Checking for existence of user: ', username);
  PendingUser
    .findByUsernameOrEmail(username)
    .then(
      user => {
        if (!user) {
          return User
            .findByUsernameOrEmail(username)
            .then(
              verifiedUser => {
                if (!verifiedUser) {
                  logger.warn('User %s does not exist. Moving on...', username);
                  return next();
                }
                logger.info('User %s exists (verified).', username);
                req.user = verifiedUser;
                return next();
              },
              error => next(error)
            );
        }
        logger.info('User %s exists (unverified).', username);
        req.user = user;
        return next();
      },
      error => next(error)
    );
};
