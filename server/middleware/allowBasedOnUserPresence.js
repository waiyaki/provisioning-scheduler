const logger = require('logfilename')(__filename);

module.exports = (req, res, next, allowIfHasUser = true) => {
  logger.info(
    'allowIfHasUser %s', allowIfHasUser, req.user ? req.user.toJSON() : null
  );
  if (allowIfHasUser && req.user) {
    logger.info('Allowing: required user and has user.');
    return next();
  } else if (allowIfHasUser && !req.user) {
    logger.warn('Disallowing: required user and has no user.');
    return res.status(400).send({
      message: 'This user does not exist.'
    });
  } else if (!allowIfHasUser && req.user) {
    logger.warn('Disallowing: did not require user and has user.');
    return res.status(409).send({
      [req.usernameField || 'message']: `A user with this ${req.usernameField} already exists.`
    });
  }
  logger.info('Allowing: did not require user and has no user.');
  return next(); // !allowIfHasUser && !req.user.
};
