'use strict';

const bcript = require('bcryptjs')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        arg: true,
        msg: "Email must unique"
      },
      allowNull: false,
      validate: {
        notNull: {
          arg: true,
          msg: "Email Cannot null"
        },
        notEmpty: {
          arg: true,
          msg: "Email Cannot null"
        },
        isEmail: {
          arg: true,
          msg: "Email must be email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          arg: true,
          msg: "Password Cannot null"
        },
        notEmpty: {
          arg: true,
          msg: "Password Cannot null"
        },
        len: {
          args: [5, Infinity],
          msg: "Password minimum 5 "
        }
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) => {
    const hashedPassword = bcript.hashSync(user.password, 8)
    user.password = hashedPassword;
    user.role = "admin"
  });

  return User;
};