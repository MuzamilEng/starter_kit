const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const Gift = sq.define(
  "gift", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  diamonds: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reciever_id: {
    type: DataTypes.INTEGER,
    unique: false,
    references: {
      model: 'user',
      key: "id",
    },
  },
  sender_id: {
    type: DataTypes.INTEGER,
    unique: false,
    references: {
      model: 'user',
      key: "id",
    },
  },
});

module.exports = Gift;
