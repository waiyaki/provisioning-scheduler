const _ = require('lodash');

const baseConfig = {
  hostAPIUrl: process.env.HOST_URL || 'http://localhost:8000',
  SECRET_KEY: process.env.SECRET_KEY
};

const mailConfig = {
  callbackUrl: `${baseConfig.hostAPIUrl}`,
  from: 'Provisioning Scheduler <no-reply.notifications@provisioning-scheduler>',
  signature: 'Provisioning Scheduler Team',
  smtp: {
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_APIKEY
    }
  }
};

module.exports = _.merge(baseConfig, {
  mail: mailConfig
});
