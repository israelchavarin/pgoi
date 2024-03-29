import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { User } from "../models/User.js";
import { UserAccess } from "../models/UserAccess.js";
import { UserBalance } from "../models/UserBalance.js";
import { sequelize } from "../database/database.js";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { tax_identifier, national_identifier, email, password } = req.body;
    const passHashed = await bcrypt.hash(password, 10);
    const existingUsers = await User.findAll({
      where: {
        [Op.or]: [{ tax_identifier }, { national_identifier }],
      },
    });
    const existingAccesses = await UserAccess.findAll({
      where: { email },
    });

    if (existingUsers.length !== 0) {
      return res.status(400).json({
        status: 400,
        error: "Tax identifier or National identifier provided already in use",
      });
    }

    if (existingAccesses.length !== 0) {
      return res.status(400).json({
        status: 400,
        error: "Email provided already in use",
      });
    }

    const newUser = await User.create({ ...req.body }, { transaction: t });
    const { user_id, given_name, family_name } = newUser;

    await UserAccess.create(
      {
        user_id,
        email: req.body.email,
        password: passHashed,
      },
      {
        transaction: t,
      }
    );

    await UserBalance.create({ user_id }, { transaction: t });

    await t.commit();

    const token = await createAccessToken({ id: user_id });

    res.cookie("token", token);
    res.status(201).json({
      status: 201,
      message: "User created successfully",
      data: {
        user_id,
        family_name,
        given_name,
      },
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ status: 500, error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userAccess = await UserAccess.findOne({
      where: { email },
      attributes: ["user_id", "email", "password"],
    });

    if (!userAccess)
      return res.status(400).json({ status: 400, error: "User not found" });

    const isMatch = await bcrypt.compare(password, userAccess.password);

    if (!isMatch)
      return res
        .status(400)
        .json({ status: 400, error: "Invalid credentials" });

    const userIdentity = await User.findOne({
      where: { user_id: userAccess.user_id },
      attributes: ["given_name", "family_name"],
    });

    const token = await createAccessToken({ id: userAccess.user_id });

    res.cookie("token", token);
    res.status(200).json({
      status: 200,
      data: {
        id: userAccess.user_id,
        given_name: userIdentity.given_name,
        family_name: userIdentity.family_name,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.status(200).json({ status: 200, message: "Logout successful" });
};

export const showProfile = async (req, res) => {
  try {
    const userFound = await User.findOne({
      where: { user_id: req.userInfo.id },
      attributes: ["user_id", "given_name", "family_name"],
    });

    if (!userFound)
      return res.status(400).json({ status: 400, error: "User not found" });

    return res.status(200).json({
      status: 200,
      data: {
        user_id: userFound.user_id,
        given_name: userFound.given_name,
        family_name: userFound.family_name,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

// request being executed everytime a page loads
export const verifyToken = async (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  if (!token)
    return res.status(401).json({ status: 401, error: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err)
      return res.status(401).json({ status: 401, error: "Unauthorized" });

    const userFound = await User.findOne({
      where: { user_id: decodedToken.id },
      attributes: ["user_id", "given_name", "family_name"],
    });

    // the token was valid but no user was found
    if (!userFound)
      return res.status(401).json({ status: 401, error: "Unauthorized" });

    return res.status(200).json({
      status: 200,
      data: {
        user_id: userFound.user_id,
        given_name: userFound.given_name,
        family_name: userFound.family_name,
      },
    });
  });
};
