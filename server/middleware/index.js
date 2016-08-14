const requireFields = require('./requireFields');
const requireEmailWithDomains = require('./requireEmailWithDomains');
const checkUserExistence = require('./checkUserExistence');
const allowBasedOnUserPresence = require('./allowBasedOnUserPresence');

module.exports = {
  checkUserExistence,
  requireFields,
  requireEmailWithDomains,
  allowBasedOnUserPresence
};
