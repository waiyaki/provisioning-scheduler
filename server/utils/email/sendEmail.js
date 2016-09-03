const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const _ = require('lodash');
const nodemailer = require('nodemailer');
const logger = require('logfilename')(__filename);

const config = require('../../config');

function getTemplate(type) {
  const filename = path.join(
    path.dirname(__filename), 'templates', `${type}.ejs`
  );
  return new Promise((resolve, reject) => {
    logger.info('Reading template: ', filename);
    fs.readFile(filename, 'utf-8', (error, data) => {
      if (error) {
        logger.error('Error reading template: ', error);
        return reject(error);
      }
      return resolve(data);
    });
  });
}

function renderTemplate(template, options = {}) {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    const locals = _.merge({
      callbackUrl: config.mail.callbackUrl,
      signature: config.mail.signature
    }, options);
    logger.info('Rendering email template with locals: ', locals);
    try {
      return resolve(ejs.render(template, locals));
    } catch (error) {
      logger.error('Error rendering template: ', error);
      return reject(error);
    }
  });
}

function sendEmail(user, type) {
  logger.info('Sending email %s to user', type, user.toJSON());
  return new Promise((resolve, reject) => {
    getTemplate(type).then(
      template => renderTemplate(template, {
        verificationToken: user.verificationToken
      }),
      error => reject(error)
    ).then(
      html => {
        const lines = html.split('\n');
        const subject = lines[0];
        const body = lines.slice(1).join('\n');

        const mailOptions = {
          from: config.mail.from,
          to: user.email,
          html: body,
          subject
        };

        // Temp credentials as I wait for Mailgun to resolve some issues
        // with my test account.
        // const temporaryMailerConfig = _
        //   smtp: {
        //     service: 'Gmail',
        //     auth: {
        //       user: process.env.GMAIL_USER,
        //       pass: process.env.GMAIL_APP_PASSWORD
        //     }
        //   }
        // };
        //
        // config.mail.smtp = temporaryMailerConfig.smtp;
        logger.info('Configuring mailer: ', Object.assign(
          {},
          config.mail.smtp,
          {
            auth: {
              user: config.mail.smtp.auth.user,
              pass: '<redacted>'
            }
          }
        )
        );
        const transporter = nodemailer.createTransport(config.mail.smtp);

        logger.info('sendMail: ', _.omit(mailOptions, 'html'));
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            logger.error('Error sending email: ', err);
            return reject(err);
          }
          logger.info('Successfully sent email: ', info);
          return resolve(info);
        });
      },
      error => reject(error)
    );
  });
}

module.exports = {
  getTemplate,
  renderTemplate,
  sendEmail
};
