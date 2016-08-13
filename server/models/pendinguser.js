/* eslint-disable new-cap */
const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const PendingUser = sequelize.define('PendingUser', {
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
    },
    isPending: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    verificationToken: {
      type: DataTypes.STRING(36)
    }
  }, {
    tableName: 'pending_users',
    classMethods: {
      findByUsernameOrEmail(value) {
        return this.find({
          where: {
            $or: [{ username: value }, { email: value }]
          }
        });
      },

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

      findByToken(token) {
        return this.findByKey('verificationToken', token);
      }
    },

    instanceMethods: {
      toJSON() {
        const values = this.get({ clone: true });
        delete values.password;
        delete values.verificationToken;
        return values;
      }
    },

    hooks: {
      afterValidate: (user) => {
        user.password = bcrypt.hashSync(user.password);
      }
    }
  });

  return PendingUser;
};
