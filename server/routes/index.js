const { userController } = require('../controllers');
const { requireFields, requireEmailWithDomains } = require('../middleware');

module.exports = (router) => {
  router.route('/api')
    .get((req, res) => res.send({
      message: 'Welcome to the API!'
    }));

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
      userController.create
    )
    .all((req, res) => res.status(405).send({
      message: 'Method Not Allowed.'
    }));

  return router;
};
