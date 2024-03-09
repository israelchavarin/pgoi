import currency from "currency.js";
import { Opportunity } from "../models/Opportunity.js";
import { UserBalance } from "../models/UserBalance.js";
import { Order } from "../models/Order.js";

export const getOpportunities = async (req, res) => {
  try {
    const oppties = await Opportunity.findAll({ where: { available: true } });
    res.status(200).json({ status: 200, data: oppties });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

export const getOpportunity = async (req, res) => {
  try {
    const oppty = await Opportunity.findByPk(req.params.opportunity_id);
    if (!oppty || oppty.available === false) {
      return res
        .status(404)
        .json({ status: 404, error: "Opportunity not available" });
    }
    res.status(200).json({ status: 200, data: oppty });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

export const updateOpportunity = async (req, res) => {
  try {
    const { opportunity_id } = req.params;
    const { investment_amount, term_in_days } = req.body;
    const investmentCurrency = currency(investment_amount);
    // transaction
    const userBalances = await UserBalance.findByPk(req.userInfo.id);
    if (!userBalances) {
      return res
        .status(400)
        .json({ status: 400, error: "User could not be identified" });
    }

    const oppty = await Opportunity.findByPk(opportunity_id);
    if (!oppty || oppty.available === false) {
      return res
        .status(404)
        .json({ status: 404, error: "Opportunity not available" });
    }

    const currentBalanceCurrency = currency(userBalances.current_balance);
    const minInvestCurrency = currency(oppty.minimum_investment);
    const limitInvestCurrency = currency(oppty.investment_limit);

    if (investmentCurrency.value > currentBalanceCurrency.value) {
      return res.status(400).json({
        status: 400,
        error: `You only have ${currentBalanceCurrency.format()} of the ${investmentCurrency.format()}`,
      });
    }

    if (investmentCurrency.value < minInvestCurrency.value) {
      return res.status(400).json({
        status: 400,
        error: `You must invest at least: ${minInvestCurrency.format()}`,
      });
    }

    if (investmentCurrency.value > limitInvestCurrency.value) {
      return res.status(400).json({
        status: 400,
        error: `You cannot exceed the limit of ${limitInvestCurrency.format()}`,
      });
    }

    oppty.investment_limit =
      limitInvestCurrency.subtract(investmentCurrency).value;

    if (oppty.investment_limit < oppty.minimum_investment) {
      oppty.minimum_investment = 1;
    }

    if (oppty.investment_limit === 0) {
      oppty.available = false;
    }

    await oppty.save();

    // Update balances of user after investment
    userBalances.current_balance = currency(
      userBalances.current_balance
    ).subtract(investmentCurrency).value;

    userBalances.used_balance = currency(userBalances.used_balance).add(
      investmentCurrency
    ).value;

    await userBalances.save();

    // Create order
    await Order.create({
      user_id: req.userInfo.id,
      opportunity_id,
      investment_amount,
      agreed_percentage: oppty.profit_percentage,
      term_in_days,
    });

    return res.status(200).json({
      status: 200,
      message: "Investment successful",
      data: { remainingLimit: oppty.investment_limit },
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};
