import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Opportunity = sequelize.define(
  "opportunity",
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
      unique: true,
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
    hooks: {
      afterSync: async (options) => {
        // Insertion of dummy opportunities after the table is created
        try {
          await Opportunity.bulkCreate([
            {
              opportunity_name: "Opportunity 1",
              description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A, voluptas enim, in illum ullam delectus inventore optio, praesentium fuga id quo molestias alias accusantium ipsam amet ipsa asperiores voluptate dicta.",
              profit_percentage: 1.4,
              minimum_investment: 2000,
              investment_limit: 40000,
            },
            {
              opportunity_name: "Opportunity 2",
              description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A, voluptas enim, in illum ullam delectus inventore optio, praesentium fuga id quo molestias alias accusantium ipsam amet ipsa asperiores voluptate dicta.",
              profit_percentage: 2.3,
              minimum_investment: 8000,
              investment_limit: 120000,
            },
            {
              opportunity_name: "Opportunity 3",
              description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A, voluptas enim, in illum ullam delectus inventore optio, praesentium fuga id quo molestias alias accusantium ipsam amet ipsa asperiores voluptate dicta.",
              profit_percentage: 4.1,
              minimum_investment: 12000,
              investment_limit: 240000,
            },
            {
              opportunity_name: "Opportunity 4",
              description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A, voluptas enim, in illum ullam delectus inventore optio, praesentium fuga id quo molestias alias accusantium ipsam amet ipsa asperiores voluptate dicta.",
              profit_percentage: 5.0,
              minimum_investment: 14500,
              investment_limit: 362500,
            },
            {
              opportunity_name: "Opportunity 5",
              description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A, voluptas enim, in illum ullam delectus inventore optio, praesentium fuga id quo molestias alias accusantium ipsam amet ipsa asperiores voluptate dicta.",
              profit_percentage: 6.2,
              minimum_investment: 18000,
              investment_limit: 540000,
            },
            {
              opportunity_name: "Opportunity 6",
              description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A, voluptas enim, in illum ullam delectus inventore optio, praesentium fuga id quo molestias alias accusantium ipsam amet ipsa asperiores voluptate dicta.",
              profit_percentage: 7.5,
              minimum_investment: 25000,
              investment_limit: 600000,
            },
          ]);
        } catch (error) {
          console.error("Error inserting demo opportunities:", error);
        }
      },
    },
  }
);
