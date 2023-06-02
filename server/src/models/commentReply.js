const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const CommentReply = sq.define(
  "commentReply",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    reply: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {
    freezeTableName: true,
    timestamps: true
  }
);

module.exports = CommentReply;
