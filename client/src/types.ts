export type User = {
  id: string;
  given_name: string;
  family_name: string;
};

export type Opportunity = {
  available: boolean;
  createdAt: string;
  description: string;
  investment_limit: number;
  minimum_investment: number;
  opportunity_id: string;
  opportunity_name: string;
  profit_percentage: string;
  updatedAt: string;
};
