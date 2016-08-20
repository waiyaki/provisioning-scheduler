const userRoutes = require('./user');
const scheduledTasksRoutes = require('./scheduled-tasks');

const { authenticateRequests } = require('../middleware');

module.exports = (app) => {
  app.get('/api', (req, res) => res.send({
    message: 'Welcome to the API!'
  }));

  // Handle routes that don't require authentication, or that are concerned
  // with authenticating.
  app.use('/api/users', userRoutes.publicUserRoutes);

  // From here on, require that users have an authentication token.
  app.use('*', authenticateRequests);
  app.use('/api/users', userRoutes.protectedUserRoutes);
  app.use(
    '/api/scheduled-tasks',
    scheduledTasksRoutes.protectedScheduledTasksRoutes
  );
};
