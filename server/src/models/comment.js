const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const VideoComment = sq.define(
  "comment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {
    freezeTableName: true,
    timestamps: true
  }
);

module.exports = VideoComment;
