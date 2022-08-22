'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(
        models.Spot, {
          foreignKey: 'spotId',
          onDelete: 'CASCADE'
        }
      )
      Image.belongsTo(
        models.Review, {
          foreignKey: 'reviewId',
          onDelete: 'CASCADE'
        }
      )
    }
  }
  Image.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    previewImage: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,     // check if correct
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reviewId: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Image',
    defaultScope: {           // INSERT SCOPES AFTER MODEL NAME
      attributes: {
        exclude: [
          'createdAt', 'updatedAt'
        ]
      }
    },
    scopes: {
      limitStuff: {
        attributes:{
          exclude: ["previewImage", "spotId", "userId"]
        }
      }
    }
  });
  return Image;
};