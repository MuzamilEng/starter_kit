const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const Document = sq.define(
  "document",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    file: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Document;
