/* eslint-disable new-cap */
const jwt = require('jsonwebtoken');
const merge = require('lodash/merge');

const config = require('../config');
const { schema, options } = require('./schemas/user-schema');

module.exports = (sequelize, DataTypes) => {
  const additionalFields = {
    isPending: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    verificationToken: {
      type: DataTypes.STRING(36)
    }
  };

  const pendingUserSchema = merge({}, schema(DataTypes), additionalFields);

  const modelOptions = merge({}, options, {
    tableName: 'pending_users',

    classMethods: {
      findByToken(token) {
        return this.findByKey('verificationToken', token);
      }
    },

    instanceMethods: {
      generateToken() {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);

        return jwt.sign({
          id: this.id,
          username: this.username,
          exp: parseInt(expiry.getTime() / 1000, 10),
          isPending: true
        }, config.SECRET_KEY);
      },

      toJSON() {
        const values = this.get({ clone: true });
        delete values.password;
        delete values.verificationToken;
        return values;
      }
    }
  });

  const PendingUser = sequelize.define(
    'PendingUser',
    pendingUserSchema,
    modelOptions
  );

  return PendingUser;
};
