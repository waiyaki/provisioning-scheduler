const requireFields = require('./requireFields');
const requireEmailWithDomains = require('./requireEmailWithDomains');
const checkUserExistence = require('./checkUserExistence');
const allowBasedOnUserPresence = require('./allowBasedOnUserPresence');

const disallowMethod = (req, res) => res.status(405).send({
  message: 'Method Not Allowed.'
});

module.exports = {
  checkUserExistence,
  disallowMethod,
  requireFields,
  requireEmailWithDomains,
  allowBasedOnUserPresence
};
