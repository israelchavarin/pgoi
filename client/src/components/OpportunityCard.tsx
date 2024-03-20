import { useState } from "react";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import type { Opportunity } from "../types";
import FormInput from "./FormInput";
import { patchRequest } from "../api/auth";
import { useNavigate } from "react-router-dom";
import StyledButton from "./StyledButton";
import ErrorP from "./ErrorP";

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
    <article className='bg-orange-300 max-w-md w-full p-10 rounded-md'>
      <h2 className='text-lg font-bold'>{oppty.opportunity_name}</h2>
      <p>{oppty.description}</p>
      <p>Investment limit: {oppty.investment_limit}</p>
      <p>Minimum investment: {oppty.minimum_investment}</p>
      <p>Profit percentage: {oppty.profit_percentage}%</p>
      {visibleInvestButton && (
        <StyledButton
          onClick={() => {
            setVisibleForm(true);
            setVisibleInvestButton(false);
          }}
          text='Invest'
        />
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
          {errors.investment_amount && <ErrorP text='Amount required' />}
          <select
            {...register("term_in_days", {
              required: true,
              valueAsNumber: true,
            })}
            className='w-full bg-stone-700 text-white px-3 py-2 rounded-md my-2'
          >
            <option value=''>Term in days</option>
            <option value={30}>30</option>
            <option value={90}>90</option>
            <option value={180}>180</option>
            <option value={365}>365</option>
          </select>
          {errors.term_in_days && <ErrorP text='Term required' />}
          <div className='flex justify-between'>
            <StyledButton
              type='button'
              onClick={() => {
                setVisibleForm(false);
                setVisibleInvestButton(true);
                reset();
                setError("");
              }}
              text='Cancel'
            />
            <button className='text-orange-950'>Make investment</button>
          </div>
        </form>
      )}
      {error && <ErrorP text={error} />}
    </article>
  );
}
