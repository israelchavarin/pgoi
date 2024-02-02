import { DataTypes } from "sequelize";
import db from "../database.js";

const Opportunity = db.define(
  "Opportunity",
  {
    opportunity_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    opportunity_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    profit_percentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    minimum_investment: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    investment_limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Opportunity;
