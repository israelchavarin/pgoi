import { useEffect, useState } from "react";
import { getRequest } from "../api/auth";
import OpportunityCard from "../components/OpportunityCard";
import type { Opportunity } from "../types";

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
    <section>
      <h2 className='text-2xl text-center'>Available opportunities</h2>
      <div className='grid grid-cols-3 gap-2'>
        {opportunities.map((oppty) => (
          <OpportunityCard oppty={oppty} key={oppty.opportunity_id} />
        ))}
      </div>
    </section>
  );
}
