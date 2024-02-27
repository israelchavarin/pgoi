import { z } from "zod";

export const investSchema = z.object({
  investment_amount: z
    .number({
      required_error: "Amount is required",
    })
    .refine((amount) => amount > 0, {
      message: "Amount must be greater than 0",
    }),
  term_in_days: z
    .number({ required_error: "Term is required" })
    .refine((term) => [30, 90, 180, 365].includes(term), {
      message: "Term must be 30, 90, 180, or 365",
    }),
});
