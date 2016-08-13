const { userController } = require('../controllers');
const {
  requireFields, requireEmailWithDomains, checkUserExistence
} = require('../middleware');

const disallowMethod = (req, res) => res.status(405).send({
  message: 'Method Not Allowed.'
});

module.exports = (router) => {
  router.route('/api')
    .get((req, res) => res.send({
      message: 'Welcome to the API!'
    }));

  router.route('/api/users/verifyemail/:verificationToken')
    .get(userController.verifyEmail)
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
      userController.create
    )
    .all(disallowMethod);

  return router;
};
