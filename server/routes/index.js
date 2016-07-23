const { userController } = require('../controllers');
const { requireFields } = require('../middleware');

module.exports = (router) => {
  router.route('/api')
    .get((req, res) => res.send({
      message: 'Welcome to the API!'
    }));

  router.route('/api/users')
    // Intercept the request in a middleware and validate that we have all
    // required fields before hitting the controller.
    .post((req, res, next) => requireFields(req, res, next, {
      requiredFields: ['firstName', 'lastName', 'username', 'email', 'password']
    }), userController.create)
    .all((req, res) => res.status(405).send({
      message: 'Method Not Allowed.'
    }));

  return router;
};
