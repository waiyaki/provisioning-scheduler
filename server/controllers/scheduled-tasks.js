const logger = require('logfilename')(__filename);
const moment = require('moment');

const { ScheduledTask, User } = require('../models');
const { handleErrors } = require('../utils');

function create(req, res) {
  logger.info('Creating ScheduledTask with data: ', req.body);
  return ScheduledTask
    .create(
      Object.assign({}, req.body, {
        userId: req.user.id,
        time: moment(req.body.time, 'hh').toDate().toLocaleTimeString()
      })
    )
    .then(
      scheduledTask => {
        const scheduledTaskJSON = scheduledTask.toJSON();
        logger.info('Created scheduledTask: ', scheduledTaskJSON);
        res.status(201).send(scheduledTaskJSON);
      },
      error => {
        logger.error('Error creating ScheduledTask: ', error);
        return handleErrors.resolve(res, error);
      }
    );
}

function list(req, res) {
  logger.info('Listing all available scheduledTasks...');
  return ScheduledTask
    .findAll({
      include: {
        model: User,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName', 'username', 'email']
      }
    })
    .then(
      tasks => res.status(200).send(tasks),
      error => {
        logger.error('Error while fetching all scheduled tasks', error);
        return handleErrors.resolve(res, error);
      }
    );
}

module.exports = {
  create,
  list
};
