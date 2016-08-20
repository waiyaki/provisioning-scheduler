module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('scheduled_tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      partner: {
        type: Sequelize.STRING,
        allowNull: false
      },
      engineer: {
        type: Sequelize.STRING
      },
      engineersPhoneNumber: {
        type: Sequelize.STRING
      },
      siteName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contactPerson: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contactPersonsPhoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      town: {
        type: Sequelize.STRING,
        allowNull: false
      },
      circuitId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      activity: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      medium: {
        type: Sequelize.STRING,
        allowNull: false
      },
      time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      projectManager: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
          as: 'userId'
        }
      }
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('scheduled_tasks');
  }
};
