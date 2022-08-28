"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reviews", {
      id: {
        allowNull: false,
        // onDelete: "CASCADE",
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      review: {
        type: Sequelize.TEXT,
        allowNull: false, // Can it be empty?
      },
      stars: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {model: "Users"},
        // onDelete: "CASCADE"
      },
      spotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {model: "Spots"},
        // onDelete: "CASCADE"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Reviews");
  },
};
