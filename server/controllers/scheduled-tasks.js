const logger = require('logfilename')(__filename);
const moment = require('moment');

const { ScheduledTask } = require('../models');
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


module.exports = {
  create
};
