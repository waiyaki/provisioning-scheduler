const { PhoneNumberUtil } = require('google-libphonenumber');
const phoneUtil = PhoneNumberUtil.getInstance();

const validatePhoneNumber = (number) => {
  const parsedNumber = phoneUtil.parseAndKeepRawInput(number, 'KE');

  return phoneUtil.isValidNumber(parsedNumber);
};

module.exports = (sequelize, DataTypes) => {
  const ScheduledTask = sequelize.define('ScheduledTask', {
    partner: {
      type: DataTypes.STRING,
      allowNull: false
    },
    engineer: {
      type: DataTypes.STRING
    },
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
    siteName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contactPerson: {
      type: DataTypes.STRING,
      allowNull: false
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
    },
    town: {
      type: DataTypes.STRING,
      allowNull: false
    },
    circuitId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    activity: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    medium: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    projectManager: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'scheduled_tasks',
    classMethods: {
      associate: (models) => {
        ScheduledTask.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
      }
    }
  });

  return ScheduledTask;
};
