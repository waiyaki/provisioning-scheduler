module.exports = (req, res, next, { requiredFields }) => {
  const errors = {};
  for (const field of requiredFields) {
    if (!req.body[field]) {
      errors[field] = 'This field is required.';
    }
  }

  if (Object.keys(errors).length) {
    return res.status(400).send(errors);
  }

  return next();
};
