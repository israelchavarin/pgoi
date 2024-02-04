import { Opportunity } from "../models/Opportunity.js";

export const getOpportunities = async (req, res) => {
  const oppties = await Opportunity.findAll();
  res.json(oppties);
};

export const getOpportunity = async (req, res) => {};

export const updateOpportunity = async (req, res) => {};
