import { z } from "zod";

export const depositSchema = z.object({
  deposit_amount: z
    .number({
      required_error: "Amount is required",
    })
    .refine((amount) => amount > 0, {
      message: "Amount must be greater than 0",
    }),
});
