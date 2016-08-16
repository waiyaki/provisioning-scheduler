const _ = require('lodash');

const baseConfig = {
  hostAPIUrl: process.env.HOST_URL || 'http://localhost:8000/api',
  SECRET_KEY: process.env.SECRET_KEY
};

const mailConfig = {
  callbackUrl: `${baseConfig.hostAPIUrl}/users`,
  from: 'Provisioning Scheduler <no-reply.notifications@provisioning-scheduler>',
  signature: 'Provisioning Scheduler Team',
  smtp: {
    service: 'Mailgun',
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_APIKEY
    }
  }
};

module.exports = _.merge(baseConfig, {
  mail: mailConfig
});
