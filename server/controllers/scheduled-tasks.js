const logger = require('logfilename')(__filename);
const merge = require('lodash/merge');

const { ScheduledTask, User } = require('../models');
const { handleErrors } = require('../utils');

function findAndPopulate({
  sourceModel = ScheduledTask,
  whichFind = 'findOne',
  field = 'id',
  value,
  includeModel = User,
  as = 'user',
  q = {},
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

  let query = merge({}, q, {
    include: {
      model: includeModel,
      as,
      attributes: attrs
    }
  });

  if (whichFind === 'findOne') {
    if (q.where) {
      query = merge({}, query, q, {
        where: {
          [field]: value
        }
      });
    } else {
      query.where = {
        [field]: value
      };
    }
  }

  return sourceModel[whichFind](query);
}

function create(req, res) {
  logger.info('Creating ScheduledTask with data: ', req.body);
  return ScheduledTask
    .create(
      Object.assign({}, req.body, {
        userId: req.user.id
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
  const today = new Date(new Date().toISOString().replace(/T.*/, ''));
  const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  return findAndPopulate({
    whichFind: 'findAll',
    q: {
      where: {
        createdAt: {
          $lt: tomorrow,
          $gt: today
        },
        userId: req.user.id
      },
      order: '"createdAt" DESC'
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

function retrieve(req, res) {
  const { taskId } = req.params;
  return findAndPopulate({ value: taskId })
    .then(task => {
      if (!task) {
        return handleErrors.send(res, {
          message: `Task id ${taskId} doesn't exist.`
        });
      }
      return res.status(200).send(task.toJSON());
    })
    .catch(error => {
      logger.error('Error getting single task taskId: ', req.params.taskId, error);
      return handleErrors.resolve(res, error);
    });
}

function update(req, res) {
  const { taskId } = req.params;

  return findAndPopulate({ value: taskId })
    .then(task => {
      const data = req.body;
      return task.update(
        data, { fields: Object.keys(data) }
      )
      .then(() => res.status(200).send(task))
      .catch(error => {
        logger.error('Error updating task: ', taskId, error);
        return handleErrors.resolve(res, error);
      });
    })
    .catch(error => {
      logger.error('Error getting single task taskId: ', req.params.taskId, error);
      return handleErrors.resolve(res, error);
    });
}

module.exports = {
  create,
  list,
  retrieve,
  update
};
