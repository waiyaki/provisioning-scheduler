const logger = require('logfilename')(__filename);

const { User, PendingUser } = require('../models');

module.exports = (req, res, next) => {
  const { username, email } = req.body;
  logger.info('Checking for existence of user: ', username);

  /**
   * Check whether a user exists in either User model or PendingUser model.
   * The order of the parameters is important.
   *
   * @method runPromises
   * @param  {Array} promises Array of [findByUsername, findByEmail] promises.
   *                          The order is important.
   * @return {Promise} true|false depending on whether a user was found in
   *                              either model.
   */
  const runPromises = promises => Promise.all(promises)
    .then(resolved => {
      const [fromUsername, fromEmail] = resolved;
      if (fromUsername) {
        logger.info('User %s exists (unverified).', username);
        req.usernameField = 'username';
        req.user = fromUsername;
        return Promise.resolve(true);
      } else if (fromEmail) {
        logger.info('User %s exists (unverified).', email);
        req.usernameField = 'email';
        req.user = fromEmail;
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    });

  return runPromises([
    PendingUser.findByUsername(username),
    PendingUser.findByEmail(email)
  ]).then(exists => {
    if (exists) {
      return next();
    }
    return runPromises([
      User.findByUsername(username),
      User.findByEmail(email)
    ]).then(exists => { // eslint-disable-line no-shadow
      if (exists) {
        return next();
      }
      logger.warn('User %s does not exist. Moving on...', username);
      return next();
    });
  });
};
