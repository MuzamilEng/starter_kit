const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const Admin = sq.define(
  "admin",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    profile_image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      values: [1, 0],
      defaultValue: 1,
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: function () {
        let d = new Date();
        return d.toISOString();
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Admin;
