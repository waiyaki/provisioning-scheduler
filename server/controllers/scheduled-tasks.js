const logger = require('logfilename')(__filename);
const merge = require('lodash/merge');

const { ScheduledTask, User } = require('../models');
const { handleErrors } = require('../utils');

/**
 * Construct a `where` clause that restricts access to the owner of the
 * resource but allows access to admins.
 *
 * @method restrictToOwnerOrAdmin
 * @param  {Object} {user} Request object with currently logged in user object.
 * @return {Object} An empty object is user is admin else an object with a
 * `where` clause restricting access to the owner of the resource.
 */
const restrictToOwnerOrAdmin = ({ user }) => user.isAdmin && {} || {
  where: {
    userId: user.id
  }
};

/**
 * Given a source model and a related model, find resources in the sourceModel
 * and include the related fields from the related model based on conditions
 * given in the provided parameters
 *
 *
 * @method findAndPopulate
 * @param  {Object} [{ user={} } = {}] Optional user object.
 * @param  {Object} [sourceModel=ScheduledTask] The sourceModel
 * @param  {String} [whichFind='findOne'] The find operation to run on the source model.
 * @param  {String} [field='id'] If we are finding a single resource,
 * constrain the search using this field.
 * @param  {String} value Value of `field`
 * @param  {Object} [includeModel=User] Related model to include in the query.
 * @param  {String} [as='user'] Key under which to include results from includeModel.
 * @param  {Object} [q={}] Query to run against the database.
 * @param  {Object} attributes Attributes to include/exclude from the results.
 * @return {Promise} Promise results object.
 */
function findAndPopulate({ user = {} } = {}, {
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

  let query = merge({}, q, restrictToOwnerOrAdmin({ user }), {
    attributes: {
      exclude: user.isAdmin && [] || ['doneBy', 'status']
    },
    include: {
      model: includeModel,
      as,
      attributes: attrs
    }
  });

  // If we're only finding one thing, add the value constraint to `where`.
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
        return findAndPopulate(req, { value: scheduledTask.id })
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
  return findAndPopulate(req, {
    whichFind: 'findAll',
    q: {
      where: {
        createdAt: {
          $lt: tomorrow,
          $gt: today
        }
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
  return findAndPopulate(req, {
    value: taskId
  })
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

  return findAndPopulate(req, {
    value: taskId
  })
  .then(task => {
    if (!task) {
      return handleErrors.send(res, {
        message: `Task id ${taskId} doesn't exist or you don't have permission to update it.`
      });
    }
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
