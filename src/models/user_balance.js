import { DataTypes } from "sequelize";
import db from "../database.js";
import User from "./user.js";

const UserBalance = db.define(
  "UserBalance",
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

module.exports = UserBalance;
