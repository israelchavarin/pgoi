import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { User } from "./User.js";

export const UserBalance = sequelize.define(
  "user_balance",
  {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    current_balance: {
      type: DataTypes.DECIMAL(11, 2),
      defaultValue: 1000,
      allowNull: false,
    },
    used_balance: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    timestamps: true,
  }
);

User.hasOne(UserBalance, { foreignKey: "user_id" });
UserBalance.belongsTo(User, { foreignKey: "user_id" });
