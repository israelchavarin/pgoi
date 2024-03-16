import { useState } from "react";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import type { Opportunity } from "../types";
import FormInput from "./FormInput";
import { patchRequest } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function OpportunityCard({ oppty }: { oppty: Opportunity }) {
  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleInvestButton, setVisibleInvestButton] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const invest = async (id: string, data: FieldValues) => {
    setError("");
    try {
      const res = await patchRequest(`opportunities/${id}/invest`, data);
      if (res.status !== 200) throw new Error(res.error || "Unknown error");
      navigate("/orders");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setError(errorMessage);
    }
  };

  const onSubmit = handleSubmit((data) => {
    invest(oppty.opportunity_id, data);
  });

  return (
    <article className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <h2 className='text-lg font-bold'>{oppty.opportunity_name}</h2>
      <p className='text-slate-300'>{oppty.description}</p>
      <p>Investment limit: {oppty.investment_limit}</p>
      <p>Minimum investment: {oppty.minimum_investment}</p>
      <p>Profit percentage: {oppty.profit_percentage}%</p>
      {visibleInvestButton && (
        <button
          onClick={() => {
            setVisibleForm(true);
            setVisibleInvestButton(false);
          }}
        >
          Invest
        </button>
      )}
      {visibleForm && (
        <form onSubmit={onSubmit}>
          <FormInput
            type='text'
            placeholder='Amount to invest'
            {...register("investment_amount", {
              required: true,
              valueAsNumber: true,
            })}
            autoFocus
          />
          {errors.investment_amount && (
            <p className='text-red-500'>Amount required</p>
          )}
          <select
            {...register("term_in_days", {
              required: true,
              valueAsNumber: true,
            })}
            className='w-full bg-zinc-700 text-white px-3 py-2 rounded-md my-2'
          >
            <option value=''>Term in days</option>
            <option value={30}>30</option>
            <option value={90}>90</option>
            <option value={180}>180</option>
            <option value={365}>365</option>
          </select>
          {errors.term_in_days && <p className='text-red-500'>Term required</p>}
          <div className='flex justify-between'>
            <button
              type='button'
              onClick={() => {
                setVisibleForm(false);
                setVisibleInvestButton(true);
                reset();
                setError("");
              }}
            >
              Cancel
            </button>
            <button>Make investment</button>
          </div>
        </form>
      )}
      {error && <p className='text-red-500'>{error}</p>}
    </article>
  );
}
