import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const User = sequelize.define(
  "user",
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    given_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    family_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    tax_identifier: {
      // the rfc in Mexico
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    national_identifier: {
      // the curp in Mexico
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    street: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    premise: {
      // external number
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sub_premise: {
      // internal number
      type: DataTypes.TEXT,
    },
    dependent_locality: {
      // neighborhood / suburb
      type: DataTypes.TEXT,
      allowNull: false,
    },
    locality: {
      // city / town
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    administrative_area: {
      // state / province / region
      type: DataTypes.TEXT,
      allowNull: false,
    },
    country: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
