const requireFields = require('./requireFields');
const requireEmailWithDomains = require('./requireEmailWithDomains');
const checkUserExistence = require('./checkUserExistence');
const allowBasedOnUserPresence = require('./allowBasedOnUserPresence');
const authenticateRequests = require('./authenticateRequests');

const disallowMethod = (req, res) => res.status(405).send({
  message: 'Method Not Allowed.'
});

module.exports = {
  allowBasedOnUserPresence,
  authenticateRequests,
  checkUserExistence,
  disallowMethod,
  requireEmailWithDomains,
  requireFields
};
