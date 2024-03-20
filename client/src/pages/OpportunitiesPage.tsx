import { useEffect, useState } from "react";
import { getRequest } from "../api/auth";
import OpportunityCard from "../components/OpportunityCard";
import type { Opportunity } from "../types";

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [error, setError] = useState("");

  const getOpportunities = async () => {
    try {
      const res = await getRequest("opportunities");
      if (res.status !== 200) throw new Error(res.error || "Unknown error");
      setOpportunities(res.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setError(errorMessage);
    }
  };

  useEffect(() => {
    getOpportunities();
  }, []);

  if (opportunities.length === 0) return <h1>No opportunities available.</h1>;

  if (error) return <h1>{error}</h1>;

  return (
    <section>
      <h2 className='text-2xl text-center'>Available opportunities</h2>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-2'>
        {opportunities.map((oppty) => (
          <OpportunityCard oppty={oppty} key={oppty.opportunity_id} />
        ))}
      </div>
    </section>
  );
}
