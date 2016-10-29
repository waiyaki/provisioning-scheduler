/* eslint-disable new-cap */
const jwt = require('jsonwebtoken');
const merge = require('lodash/merge');
const logger = require('logfilename')(__filename);
const bcrypt = require('bcrypt-nodejs');

const config = require('../config');
const { schema, options } = require('./schemas/user-schema');

module.exports = (sequelize, DataTypes) => {
  const additionalFields = {
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  };

  const userSchema = merge({}, schema(DataTypes), additionalFields);

  const modelOptions = merge({}, options, {
    tableName: 'users',

    instanceMethods: {
      generateToken() {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);

        return jwt.sign({
          id: this.id,
          username: this.username,
          exp: parseInt(expiry.getTime() / 1000, 10),
          isAdmin: this.isAdmin
        }, config.SECRET_KEY);
      },

      toJSON() {
        const values = this.get({ clone: true });
        delete values.password;
        return values;
      }
    },

    hooks: {
      beforeUpdate(instance) {
        if (instance.changed('password')) {
          logger.info('Hashing password for %s', instance.username);
          instance.set('password', bcrypt.hashSync(instance.get('password')));
        }
      }
    }
  });


  const User = sequelize.define('User', userSchema, modelOptions);

  return User;
};
