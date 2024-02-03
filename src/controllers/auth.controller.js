import { User } from "../models/User.js";
import { UserAccess } from "../models/UserAccess.js";
import { UserBalance } from "../models/UserBalance.js";
import { sequelize } from "../database/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res) => {
  const t = await sequelize.transaction();

  const { password } = req.body;

  try {
    const passHashed = await bcrypt.hash(password, 10);

    const newUser = await User.create(
      {
        ...req.body,
      },
      { transaction: t }
    );

    const newUserAccess = await UserAccess.create(
      {
        user_id: newUser.user_id,
        email: req.body.email,
        password: passHashed,
      },
      { transaction: t }
    );

    await UserBalance.create(
      {
        user_id: newUser.user_id,
      },
      { transaction: t }
    );

    await t.commit();

    jwt.sign(
      { id: newUser.user_id },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      },
      (err, token) => {
        if (err) {
          console.log(err);
        } else {
          res.cookie("token", token);
          res.json({
            message: "User created successfully",
          });
        }
      }
    );
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(500).json({ error: "Failed to register user." });
  }
};

export const login = (req, res) => res.send("logged in");
