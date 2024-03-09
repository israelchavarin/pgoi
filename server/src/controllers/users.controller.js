import currency from "currency.js";
import { UserBalance } from "../models/UserBalance.js";
import { Order } from "../models/Order.js";

export const getOrders = async (req, res) => {
  try {
    const userOrders = await Order.findAll({
      where: { user_id: req.userInfo.id },
    });
    res.status(200).json({ status: 200, data: userOrders });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

export const makeDeposit = async (req, res) => {
  try {
    const { deposit_amount } = req.body;
    const investmentCurrency = currency(deposit_amount);

    const userBalances = await UserBalance.findByPk(req.userInfo.id);
    if (!userBalances) {
      return res
        .status(400)
        .json({ status: 400, error: "User could not be identified" });
    }

    userBalances.current_balance = currency(userBalances.current_balance).add(
      investmentCurrency
    ).value;

    await userBalances.save();

    return res.status(200).json({
      status: 200,
      message: "Deposit successful",
      data: { newBalance: userBalances.current_balance },
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};
