'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Casts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Casts.belongsTo(models.Movie, { foreignKey: 'movieId' })
    }
  }
  Casts.init({
    name: DataTypes.STRING,
    profilePict: DataTypes.STRING,
    movieId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Casts',
  });
  return Casts;
};