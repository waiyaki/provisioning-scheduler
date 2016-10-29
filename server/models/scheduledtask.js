const { PhoneNumberUtil } = require('google-libphonenumber');
const scheduledTasksSchemaFunc = require('./schemas/scheduled-tasks-schema');
const phoneUtil = PhoneNumberUtil.getInstance();
const validatePhoneNumber = (number) => {
  const parsedNumber = phoneUtil.parseAndKeepRawInput(number, 'KE');

  return phoneUtil.isValidNumber(parsedNumber);
};

module.exports = (sequelize, DataTypes) => {
  const additionalFields = {
    status: {
      type: DataTypes.STRING
    },
    doneBy: {
      type: DataTypes.STRING
    }
  };

  const overrides = {
    engineersPhoneNumber: {
      type: DataTypes.STRING,
      validate: {
        isValidPhoneNumber(value) {
          if (!validatePhoneNumber(value)) {
            throw new Error(`${value} is an invalid phone number.`);
          }
        }
      }
    },
    contactPersonsPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isValidPhoneNumber(value) {
          if (!validatePhoneNumber(value)) {
            throw new Error(`${value} is an invalid phone number.`);
          }
        }
      }
    }
  };

  const scheduledTasksSchema = Object.assign(
    {}, scheduledTasksSchemaFunc(DataTypes), additionalFields, overrides
  );

  const ScheduledTask = sequelize.define(
    'ScheduledTask',
    scheduledTasksSchema,
    {
      tableName: 'scheduled_tasks',
      classMethods: {
        associate: (models) => {
          ScheduledTask.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
            as: 'user'
          });
        }
      }
    }
  );

  return ScheduledTask;
};
