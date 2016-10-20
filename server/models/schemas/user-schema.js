/* eslint-disable new-cap */
const bcrypt = require('bcrypt-nodejs');
const logger = require('logfilename')(__filename);

const schema = DataTypes => ({
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
});

const options = {
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
    }
  },

  instanceMethods: {
    comparePassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  },

  hooks: {
    afterValidate(instance) {
      if (instance.changed('password')) {
        logger.info('Hashing password for %s', instance.username);
        instance.set('password', bcrypt.hashSync(instance.get('password')));
      }
    }
  }
};

module.exports = {
  schema,
  options
};
