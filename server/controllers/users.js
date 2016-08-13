const uuid = require('uuid');
const _ = require('lodash');
const logger = require('logfilename')(__filename);
const { PendingUser, User } = require('../models');
const { handleErrors, sendEmail } = require('../utils');

function create(req, res) {
  return PendingUser.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    verificationToken: uuid.v4()
  }).then(
    user => {
      logger.info('User created: ', user.toJSON());
      sendEmail(user, 'user.registering').then(
        () => {
          logger.info('Email sent.');
        },
        () => {
          logger.error('Unable to send email.');
        }
      );
      return res.status(201).send(Object.assign({}, user.toJSON(), {
        sentEmail: true
      }));
    },
    error => handleErrors.resolve(res, error)
  );
}

function verifyEmail(req, res) {
  const token = req.params.verificationToken;
  logger.info('Verifying user with token: ', token);
  return PendingUser
    .findByToken(token)
    .then(
      user => {
        if (!user) {
          logger.warn('User token %s not found.', token);
          return handleErrors.send(res, {
            message: 'Invalid token. Please try requesting for another token.'
          });
        }
        return User
          .create(
            _.omit(user.dataValues, ['token', 'isPending'])
          )
          .then(
            verifiedUser => {
              logger.info('Created verified user: ', verifiedUser.toJSON());
              res.status(200).send(
                Object.assign({}, verifiedUser.toJSON(), {
                  verified: true
                })
              );

              // Perform cleanup after responding to the client.
              logger.info('Cleaning up PendingUser: ', user.username);
              PendingUser.destroy({
                where: {
                  id: user.id
                }
              }).then(() => {
                logger.info('Destroyed PendingUser: ', user.toJSON());
              });
            },
            error => {
              logger.error('Unable to create verified user: ', error);
              handleErrors.resolve(res, error);
            }
          );
      },
      error => {
        logger.error('Error while finding user token %s: ', token, error);
        handleErrors.resolve(res, error);
      }
    );
}

module.exports = {
  create,
  verifyEmail
};
