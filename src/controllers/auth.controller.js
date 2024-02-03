import { User } from "../models/User.js";
import { UserAccess } from "../models/UserAccess.js";
import { UserBalance } from "../models/UserBalance.js";
import { sequelize } from "../database/database.js";

export const registerUser = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const newUser = await User.create(
      {
        ...req.body,
      },
      { transaction: t }
    );

    await UserAccess.create(
      {
        user_id: newUser.user_id,
        email: req.body.email,
        password: req.body.password,
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

    res.json(newUser);
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(500).json({ error: "Failed to register user." });
  }
};

export const login = (req, res) => res.send("logged in");
