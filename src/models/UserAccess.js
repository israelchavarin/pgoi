import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { User } from "./User.js";

export const UserAccess = sequelize.define(
  "user_access",
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
