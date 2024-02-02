import { DataTypes } from "sequelize";
import db from "../database.js";
import User from "./user.js";

const UserAccess = db.define(
  "UserAccess",
  {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

User.hasOne(UserAccess, { foreignKey: "user_id" });
UserAccess.belongsTo(User, { foreignKey: "user_id" });

module.exports = UserAccess;
