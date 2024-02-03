import { User } from "../models/User.js";
import { UserAccess } from "../models/UserAccess.js";
import { UserBalance } from "../models/UserBalance.js";
import { sequelize } from "../database/database.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const registerUser = async (req, res) => {
  const t = await sequelize.transaction();

  const { password } = req.body;

  try {
    const passHashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body }, { transaction: t });

    await UserAccess.create(
      {
        user_id: newUser.user_id,
        email: req.body.email,
        password: passHashed,
      },
      {
        transaction: t,
      }
    );

    await UserBalance.create({ user_id: newUser.user_id }, { transaction: t });

    await t.commit();

    const token = await createAccessToken({ id: newUser.user_id });

    res.cookie("token", token);
    res.json({
      message: "User created successfully",
    });
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const login = (req, res) => res.send("logged in");
