const uuid = require('uuid');
const _ = require('lodash');
const logger = require('logfilename')(__filename);
const { PendingUser, User } = require('../models');
const { handleErrors, sendEmail } = require('../utils');

const sendEmailWrapper = (user, type) => {
  sendEmail(user, type)
    .then(
      () => {
        logger.info('Email sent');
      },
      () => {
        logger.error('Unable to send email');
      }
    );
};

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
      sendEmailWrapper(user, 'user.registering');
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
            message: 'This token is invalid. Please try resending the verification email.'
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

function resendVerificationEmail(req, res) {
  const email = req.body.email;
  logger.info('Processing request to resend verification email to %s', email);

  const resendEmail = (response, user) => {
    logger.info('Resending email to %s', user.email);
    sendEmailWrapper(user, 'user.registering');
    return response.status(200).send({
      message: 'Verification email successfully resent.'
    });
  };

  return PendingUser.findByEmail(req.body.email)
    .then(
      user => {
        if (!user) {
          // If the user is not Pending, check whether they already verified.
          return User.findByEmail(email)
            .then(
              verifiedUser => {
                if (!verifiedUser) {
                  return handleErrors.send(res, {
                    message: 'This user does not exist. Try registering instead.'
                  });
                }

                logger.info('%s is already verified.', email);
                return res.status(200).send({
                  message: 'Your account is already verified. You can log in.'
                });
              },
              error => handleErrors.resolve(res, error)
            );
        }
        return resendEmail(res, user);
      },
      error => handleErrors.resolve(res, error)
    );
}

module.exports = {
  create,
  verifyEmail,
  resendVerificationEmail
};
