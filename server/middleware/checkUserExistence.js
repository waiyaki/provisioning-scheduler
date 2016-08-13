const logger = require('logfilename')(__filename);

const { User, PendingUser } = require('../models');

module.exports = (req, res, next) => {
  const username = req.body.username;
  logger.info('Checking for existence of user: ', username);
  PendingUser
    .findByUsernameOrEmail(username)
    .then(
      user => {
        if (!user) {
          return User
            .findByUsernameOrEmail(req.body.username)
            .then(verifiedUser => {
              if (!verifiedUser) {
                logger.info('User %s does not exist. Moving on...', username);
                return next();
              }
              logger.warn('User %s exists. Refusing to create.', username);
              return res.status(409).send({
                message: 'This user exists.'
              });
            });
        }
        logger.warn('User %s exists. Refusing to create.', username);
        return res.status(409).send({
          message: 'This user exists.'
        });
      }
    );
};
