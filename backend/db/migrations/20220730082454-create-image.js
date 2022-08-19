'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      previewImage: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,     // check if correct //reset to true later
      },
      spotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      reviewId: {
        type: Sequelize.INTEGER,
        // allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,  //need to include default date?
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,    //need to include default date?
        defaultValue: new Date()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Images');
  }
};