const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const Video_like = sq.define(
  "video_like",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created",
    updatedAt: false,
  }
);

module.exports = Video_like;
