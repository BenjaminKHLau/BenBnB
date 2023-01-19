'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(
        models.User, {
          foreignKey: 'userId',
          // onDelete: 'CASCADE', //NEWLY ADDED
          hooks: true,
        }
      )
      Booking.belongsTo(
        models.Spot, {
          foreignKey: 'spotId',
          // onDelete: 'CASCADE', // NEWLY ADDED
          hooks: true,
        }
      )
    }
  }
  Booking.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        checker(value){
          if(value < this.startDate){
            throw new Error ("endDate must be after startDate")
          }
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};