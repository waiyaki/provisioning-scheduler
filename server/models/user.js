/* eslint-disable new-cap */
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const logger = require('logfilename')(__filename);

const config = require('../config');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'This email address is invalid'
        }
      }
    },
    username: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false
    }
  }, {
    tableName: 'users',
    classMethods: {
      findByKey(key, value) {
        return this.find({
          where: {
            [key]: value
          }
        });
      },

      findByEmail(email) {
        return this.findByKey('email', email);
      },

      findByUsername(username) {
        return this.findByKey('username', username);
      },

      findByUsernameOrEmail(value) {
        return this.find({
          where: {
            $or: [{ username: value }, { email: value }]
          }
        });
      }
    },

    instanceMethods: {
      comparePassword(password) {
        return bcrypt.compareSync(password, this.password);
      },

      generateToken() {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);

        return jwt.sign({
          id: this.id,
          username: this.username,
          exp: parseInt(expiry.getTime() / 1000, 10)
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

  return User;
};
