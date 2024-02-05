import { Opportunity } from "../models/Opportunity.js";

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
    const oppty = await Opportunity.findByPk(req.params.oppId);
    if (!oppty || oppty.available === false)
      return res
        .status(404)
        .json({ message: "Opportunity not available at the moment" });
    res.json(oppty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOpportunity = async (req, res) => {
  try {
    const { oppId } = req.params;
    const { investment_amount } = req.body;

    const oppty = await Opportunity.findByPk(oppId);
    if (!oppty || oppty.available === false) {
      return res
        .status(404)
        .json({ error: "Opportunity not available at the moment" });
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
    // At this moment:
    // -the current_balance of the user has to be decreased by investment_amount
    // -the used_balance has to be increased by investment_amount
    // Also an order must be created
    // The opportunity has to be listed in the user's profile
    // Meaning I need to modify the bd
    // Maybe a new table like user_investments

    return res.json({
      message: "Investment successful",
      remainingLimit: oppty.investment_limit,
    });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: error.message });
  }
};
