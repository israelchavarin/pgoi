import type { Opportunity } from "../types";

export default function OpportunityCard({ oppty }: { oppty: Opportunity }) {
  return (
    <article className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <h2 className='text-lg font-bold'>{oppty.opportunity_name}</h2>
      <p className='text-slate-300'>{oppty.description}</p>
      <div className='flex justify-between'>
        <div>
          <p>Investment limit: {oppty.investment_limit}</p>
          <p>Minimum investment: {oppty.minimum_investment}</p>
          <p>Profit percentage: {oppty.profit_percentage}%</p>
        </div>
        <button>Invest</button>
      </div>
    </article>
  );
}
