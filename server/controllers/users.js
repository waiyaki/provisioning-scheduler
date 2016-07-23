const User = require('../models').User;
const { handleErrors } = require('../utils');

function create(req, res) {
  return User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }).then(
    newUser => {
      const user = newUser.dataValues;
      delete user.password;
      return res.status(201).send(user);
    },
    error => handleErrors.resolve(res, error)
  );
}

module.exports = {
  create
};
