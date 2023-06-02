const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const Follower_And_Following = sq.define(
  "follower_and_following", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  follower_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: "id",
    },
  },
  following_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: "id",
    },
  },
});

module.exports = Follower_And_Following;
