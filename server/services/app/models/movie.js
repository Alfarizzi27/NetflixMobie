'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.hasMany(models.Casts, { foreignKey: 'movieId' })
    }
  }
  Movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          arg: true,
          msg: "Title Cannot null"
        },
        notEmpty: {
          arg: true,
          msg: "Title Cannot null"
        }
      }
    },
    slug: {
      type: DataTypes.STRING,
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          arg: true,
          msg: "Synopsis Cannot null"
        },
        notEmpty: {
          arg: true,
          msg: "Synopsis Cannot null"
        }
      }
    },
    trailerUrl: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: "Rating minimum 1"
        }
      }
    },
    genreId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });

  // Movie.beforeUpdate((movie) => {
  //   movie.slug = movie.title.split(" ").join("-")
  // });

  Movie.beforeCreate((movie) => {
    movie.slug = movie.title.split(" ").join("-")
  });


  return Movie;
};