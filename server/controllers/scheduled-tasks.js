const logger = require('logfilename')(__filename);
const moment = require('moment');

const { ScheduledTask, User } = require('../models');
const { handleErrors } = require('../utils');

function findAndPopulate({
  sourceModel = ScheduledTask,
  whichFind = 'findOne',
  field = 'id',
  value,
  includeModel = User,
  as = 'user',
  attributes
} = {}) {
  if (whichFind === 'findOne' && !value) {
    return Promise.reject(
      new Error('Missing required parameter: value')
    );
  }

  let attrs = attributes;
  if (includeModel !== User) {
    if (as === 'user') {
      return Promise.reject(
        new Error('Missing required parameter: as')
      );
    }
    if (!attrs) {
      return Promise.reject(
        new Error('Missing required parameter: attributes')
      );
    }
  } else if (!attrs) {
    attrs = { exclude: ['password'] };
  }

  const query = {
    include: {
      model: includeModel,
      as,
      attributes: attrs
    }
  };

  if (whichFind === 'findOne') {
    query.where = {
      [field]: value
    };
  }

  return sourceModel[whichFind](query);
}

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
        return findAndPopulate({ value: scheduledTask.id })
          .then(
            task => res.status(201).send(task.toJSON()),
            error => {
              logger.error(
                'Error including model in scheduledTask: ',
                scheduledTaskJSON, error
              );
              return handleErrors.resolve(res, error);
            }
          )
          .catch(error => {
            logger.error('Error sending response: ', error);
            return handleErrors.resolve(res, error);
          });
      },
      error => {
        logger.error('Error creating ScheduledTask: ', error);
        return handleErrors.resolve(res, error);
      }
    );
}

function list(req, res) {
  logger.info('Listing all available scheduledTasks...');
  return findAndPopulate({ whichFind: 'findAll' })
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
