const requireParam = (param) => {
  throw new Error(`Missing required parameter: ${param}`);
};

module.exports = {
  send(res = requireParam('response'), error = {}, status = 400) {
    return res.status(status).send(error);
  },

  /**
   * If the error is a Sequelize validation error, reformat it into something
   * easily cosumable by a client.
   */
  resolve(res = requireParam('response'), error = {}, status = 400) {
    const validationErrors = [
      'SequelizeValidationError',
      'SequelizeUniqueConstraintError'
    ];

    if (validationErrors.indexOf(error.name) !== -1) {
      const errors = error.errors
        .map(err => ({ [err.path]: err.message }))
        .reduce((obj, element) => {
          Object.keys(element).forEach(key => {
            // This will overwrite any other key with same name 😕
            obj[key] = element[key]; // eslint-disable-line no-param-reassign
          });
          return obj;
        }, {});

      return this.send(res, errors, status);
    }

    // TODO: Need better error handling for other errors. This swallows the
    // original error. 😕 -- Could use logging here though.
    return this.send(res, {
      error: 'A server error occured.'
    }, 500);
  }
};
