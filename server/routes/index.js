const userRoutes = require('./user');

module.exports = (app) => {
  app.get('/api', (req, res) => res.send({
    message: 'Welcome to the API!'
  }));

  // Handle routes that don't require authentication, or that are concerned
  // with authenticating.
  app.use('/api/users', userRoutes.publicUserRoutes);
};
