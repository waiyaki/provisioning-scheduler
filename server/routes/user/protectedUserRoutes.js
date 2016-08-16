const express = require('express');

const protectedUserRoutes = new express.Router();

protectedUserRoutes.route('/protected')
  .get((req, res) => res.status(200).send({
    message: 'authentication middleware is working fine.'
  }));

module.exports = protectedUserRoutes;
