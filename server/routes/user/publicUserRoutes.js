const express = require('express');

const { userController } = require('../../controllers');
const {
  requireEmailWithDomains, disallowMethod, requireFields,
  checkUserExistence, allowBasedOnUserPresence
} = require('../../middleware');

const publicUserRoutes = new express.Router();

publicUserRoutes.route('/')
  /**
   * Create a new user
   */
  .post(
    // Intercept the request in a middleware and validate that we have all
    // required fields before hitting the controller.
    (req, res, next) => requireFields(req, res, next, {
      requiredFields: [
        'firstName', 'lastName', 'username', 'email', 'password'
      ]
    }),
    requireEmailWithDomains,
    checkUserExistence,
    (req, res, next) => allowBasedOnUserPresence(req, res, next, false),
    userController.create
  )
  .all(disallowMethod);

/**
 * Generate an authentication token and send it back to the user.
 */
publicUserRoutes.route('/login')
  .post(
    (req, res, next) => requireFields(req, res, next, {
      requiredFields: ['email|username', 'password']
    }),
    requireEmailWithDomains,
    checkUserExistence,
    allowBasedOnUserPresence,
    userController.login
  )
  .all(disallowMethod);

/**
 * Resend the verification email to the user.
 *
 * This route has to be before the verification route else it'll be
 * interpreted by Express as a verification request.
 */
publicUserRoutes.route('/verify-email/resend')
  .put(
    (req, res, next) => requireFields(req, res, next, {
      requiredFields: ['email']
    }),
    requireEmailWithDomains,
    userController.resendVerificationEmail
  )
  .all(disallowMethod);

/**
 * Verify a user's email address based on the token they provide.
 */
publicUserRoutes.route('/verify-email/:verificationToken/verify')
  .get(userController.verifyEmail)
  .all(disallowMethod);

module.exports = publicUserRoutes;
