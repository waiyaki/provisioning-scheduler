module.exports = DataTypes => ({
  partner: {
    type: DataTypes.STRING,
    allowNull: false
  },
  engineer: {
    type: DataTypes.STRING
  },
  engineersPhoneNumber: {
    type: DataTypes.STRING
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
    allowNull: false
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
});
