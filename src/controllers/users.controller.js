import currency from "currency.js";
import { UserBalance } from "../models/UserBalance.js";
import { Order } from "../models/Order.js";

export const getOrders = async (req, res) => {
  try {
    const { user_id } = req.params;
    const userOrders = await Order.findAll({ where: { user_id } });
    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const makeDeposit = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { deposit_amount } = req.body;
    const investmentCurrency = currency(deposit_amount);

    const userBalances = await UserBalance.findByPk(user_id);
    if (!userBalances) {
      return res.status(400).json({ message: "User could not be identified" });
    }

    userBalances.current_balance = currency(userBalances.current_balance).add(
      investmentCurrency
    ).value;

    await userBalances.save();

    return res.json({
      message: "Deposit successful",
      newBalance: userBalances.current_balance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
