import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { User } from "./User.js";
import { Opportunity } from "./Opportunity.js";

export const Order = sequelize.define(
  "order",
  {
    order_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    opportunity_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    investment_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    agreed_percentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    term_in_days: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Order.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Order, { foreignKey: "user_id" });

Order.belongsTo(Opportunity, { foreignKey: "opportunity_id" });
Opportunity.hasMany(Order, { foreignKey: "opportunity_id" });
