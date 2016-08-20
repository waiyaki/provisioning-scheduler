const scheduledTasksSchemaFunc = require('../models/schemas/scheduled-tasks-schema');

module.exports = {
  up(queryInterface, Sequelize) {
    const additionalFields = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
    };

    const scheduledTasksSchema = Object.assign(
      {}, scheduledTasksSchemaFunc(Sequelize), additionalFields
    );

    return queryInterface.createTable('scheduled_tasks', scheduledTasksSchema);
  },
  down(queryInterface) {
    return queryInterface.dropTable('scheduled_tasks');
  }
};
