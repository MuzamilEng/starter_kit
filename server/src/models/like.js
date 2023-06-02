const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const VideoLike = sq.define(
  "like",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = VideoLike;
