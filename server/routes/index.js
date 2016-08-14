const { userController } = require('../controllers');
const {
  requireFields, requireEmailWithDomains, checkUserExistence,
  allowBasedOnUserPresence
} = require('../middleware');

const disallowMethod = (req, res) => res.status(405).send({
  message: 'Method Not Allowed.'
});

module.exports = (router) => {
  router.route('/api')
    .get((req, res) => res.send({
      message: 'Welcome to the API!'
    }));

  /**
   * Resend the verification email to the user.
   *
   * This route has to be before the verification route else it'll be
   * interpreted by Express as a verification request.
   */
  router.route('/api/users/verify-email/resend')
    .put(
      (req, res, next) => requireFields(req, res, next, {
        requiredFields: ['email']
      }),
      requireEmailWithDomains,
      userController.resendVerificationEmail
    )
    .all(disallowMethod);

  router.route('/api/users/verify-email/:verificationToken/verify')
    .get(userController.verifyEmail)
    .all(disallowMethod);

  router.route('/api/users/login')
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

  router.route('/api/users')
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

  return router;
};
