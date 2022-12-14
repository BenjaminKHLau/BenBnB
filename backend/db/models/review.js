'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.hasMany(
        models.Image, {
          foreignKey: 'reviewId',
          onDelete: "CASCADE",
          hooks:true,
        }
      )
      Review.belongsTo(
        models.User, {
          foreignKey: 'userId',
          // onDelete: 'CASCADE', //NEWLY ADDED
          // hooks: true,
        }
      )
      Review.belongsTo(
        models.Spot, {
          foreignKey: 'spotId',
          // onDelete: 'CASCADE', //NEWLY ADDED
          // hooks: true,
        }
      )
    }
  }
  Review.init({
    review: {
      type: DataTypes.TEXT,
      allowNull: false,       // Can this be empty?
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,     //5 or 10?
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};