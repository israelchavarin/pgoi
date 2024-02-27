import { z } from "zod";

// RFC pattern
const validateTaxIdentifier = (value) => {
  if (value.length === 12) {
    // For "Persona Moral"
    const taxIdentifier12Pattern = /^[A-Z]{3}\d{6}[A-Z0-9]{3}$/;
    return taxIdentifier12Pattern.test(value);
  } else if (value.length === 13) {
    // For "Persona Física"
    const taxIdentifier13Pattern = /^[A-Z]{4}\d{6}[A-Z0-9]{3}$/;
    return taxIdentifier13Pattern.test(value);
  }
  return false;
};

// CURP pattern
const nationalIdentifierPattern = /^[A-Z]{4}\d{6}[A-Z]{6}[A-Z0-9]{1}\d{1}$/;

// Password pattern
const passwordPattern =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{12,}$/;

export const registerSchema = z.object({
  given_name: z
    .string({
      required_error: "Given name is required",
    })
    .trim(),
  family_name: z
    .string({
      required_error: "Family name is required",
    })
    .trim(),
  birthdate: z.coerce
    .date({
      required_error: "Birthdate is required",
    })
    .max(new Date(), { message: "Birthdate must be in the past" })
    .refine(
      (date) => {
        const ageDifMs = Date.now() - date.getTime();
        const ageDate = new Date(ageDifMs);

        const age = Math.abs(ageDate.getUTCFullYear() - 1970);

        return age >= 18;
      },
      { message: "You must be at least 18 years old" }
    ),
  tax_identifier: z
    .string({
      required_error: "Tax identifier is required",
    })
    .trim()
    .toUpperCase()
    .min(12, { message: "Tax identifier must be at least 12 characters" })
    .max(13, { message: "Tax identifier must be maximum 13 characters" })
    .refine(validateTaxIdentifier, {
      message: "Tax identifier pattern not valid",
    }),
  national_identifier: z
    .string({
      required_error: "National identifier is required",
    })
    .trim()
    .toUpperCase()
    .length(18, {
      message: "National identifier must be 18 characters exactly",
    })
    .refine((value) => nationalIdentifierPattern.test(value), {
      message: "National identifier pattern not valid",
    }),
  street: z
    .string({
      required_error: "Street is required",
    })
    .trim(),
  premise: z
    .string({
      required_error: "Premise is required",
    })
    .trim(),
  sub_premise: z.string().optional(),
  dependent_locality: z
    .string({
      required_error: "Dependant locality is required",
    })
    .trim(),
  locality: z
    .string({
      required_error: "Locality is required",
    })
    .trim(),
  postal_code: z
    .string({
      required_error: "Postal code is required",
    })
    .trim()
    .regex(/^\d{5}$/, "Postal code must be 5 digits exactly"),
  administrative_area: z
    .string({
      required_error: "Administrative area is required",
    })
    .trim(),
  country: z
    .string({
      required_error: "Country is required",
    })
    .trim(),
  email: z
    .string({
      required_error: "Email is required",
    })
    .trim()
    .email({ message: "Email not valid" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .trim()
    .refine((value) => passwordPattern.test(value), {
      message:
        "Password must be at least 12 characters and include 1 number, 1 capital letter & 1 special character",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .trim()
    .email({ message: "Email not valid" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .trim()
    .refine((value) => passwordPattern.test(value), {
      message:
        "Password must be at least 12 characters and include 1 number, 1 capital letter & 1 special character",
    }),
});
