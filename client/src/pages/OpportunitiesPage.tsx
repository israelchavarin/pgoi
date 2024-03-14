import { useEffect, useState } from "react";
import { getRequest } from "../api/auth";

type Opportunity = {
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

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  const getOpportunities = async () => {
    try {
      const res = await getRequest("opportunities");
      setOpportunities(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOpportunities();
  }, []);

  if (opportunities.length === 0) return <h1>No opportunities available.</h1>;

  return (
    <>
      <h1>List of Opportunities</h1>
      {opportunities.map((oppty) => (
        <div key={oppty.opportunity_id}>
          <h3>{oppty.opportunity_name}</h3>
          <p>{oppty.description}</p>
        </div>
      ))}
    </>
  );
}
