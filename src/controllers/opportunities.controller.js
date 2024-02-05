import currency from "currency.js";
import { Opportunity } from "../models/Opportunity.js";
import { UserBalance } from "../models/UserBalance.js";
import { Order } from "../models/Order.js";

export const getOpportunities = async (req, res) => {
  try {
    const oppties = await Opportunity.findAll({ where: { available: true } });
    res.json(oppties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOpportunity = async (req, res) => {
  try {
    const oppty = await Opportunity.findByPk(req.params.opportunity_id);
    if (!oppty || oppty.available === false) {
      return res.status(404).json({ message: "Opportunity not available" });
    }
    res.json(oppty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOpportunity = async (req, res) => {
  try {
    const { opportunity_id } = req.params;
    const { user_id, investment_amount, term_in_days } = req.body;

    const userBalances = await UserBalance.findByPk(user_id);
    if (!userBalances) {
      return res.status(400).json({ message: "User could not be identified" });
    }

    const oppty = await Opportunity.findByPk(opportunity_id);
    if (!oppty || oppty.available === false) {
      return res.status(404).json({ error: "Opportunity not available" });
    }

    if (investment_amount < oppty.minimum_investment) {
      return res.status(400).json({
        error: `You must invest at least: ${oppty.minimum_investment}`,
      });
    }

    if (investment_amount > oppty.investment_limit) {
      return res.status(400).json({
        error: `You cannot exceed the limit of ${oppty.investment_limit}`,
      });
    }

    oppty.investment_limit -= investment_amount;

    if (oppty.investment_limit < oppty.minimum_investment) {
      oppty.minimum_investment = 1;
    }

    if (oppty.investment_limit === 0) {
      oppty.available = false;
    }

    await oppty.save();

    // Update balances of user after investment
    const investmentCurrency = currency(investment_amount);

    userBalances.current_balance = currency(
      userBalances.current_balance
    ).subtract(investmentCurrency).value;

    userBalances.used_balance = currency(userBalances.used_balance).add(
      investmentCurrency
    ).value;

    await userBalances.save();

    // Create order
    await Order.create({
      user_id,
      opportunity_id,
      investment_amount,
      agreed_percentage: oppty.profit_percentage,
      term_in_days,
    });

    return res.json({
      message: "Investment successful",
      remainingLimit: oppty.investment_limit,
    });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: error.message });
  }
};
