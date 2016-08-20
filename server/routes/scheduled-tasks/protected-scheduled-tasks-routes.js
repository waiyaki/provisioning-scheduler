const express = require('express');
const _ = require('lodash');
const { scheduledTasksController } = require('../../controllers');
const { requireFields, disallowMethod } = require('../../middleware');
const { Sequelize } = require('../../models/');

const scheduledTasksSchema = require('../../models/schemas/scheduled-tasks-schema')(Sequelize);

const protectedScheduledTasksRoutes = new express.Router();
const requiredFields = Object.keys(_.omit(
  scheduledTasksSchema, ['engineer', 'engineersPhoneNumber']
));

protectedScheduledTasksRoutes.route('/')
  .post(
    (req, res, next) => requireFields(req, res, next, { requiredFields }),
    scheduledTasksController.create
  )
  .all(disallowMethod);

module.exports = protectedScheduledTasksRoutes;
