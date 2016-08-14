module.exports = (req, res, next, { requiredFields = [] }) => {
  const errors = {};
  for (const field of requiredFields) {
    if (field.indexOf('|') > -1) {
      const availableFields = Object.keys(req.body).join('');
      if (!new RegExp(field).test(availableFields)) {
        const compositeFields = field.split('|');
        errors[field] = `One of either ${compositeFields.slice(
          0, compositeFields.length - 1
        ).join(', ')} or ${compositeFields.slice(-1)[0]} is required.`;
      }
    } else if (!req.body[field]) {
      errors[field] = 'This field is required.';
    }
  }

  if (Object.keys(errors).length) {
    return res.status(400).send(errors);
  }

  return next();
};
