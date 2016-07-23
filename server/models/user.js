/* eslint-disable new-cap */
const bcrypt = require('bcrypt-nodejs');

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
      comparePassword: (password, hash) => bcrypt.compareSync(password, hash)
    },
    hooks: {
      afterValidate: (user) => {
        user.password = bcrypt.hashSync(user.password);
      }
    }
  });

  return User;
};
