import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import StyledButton from "../components/StyledButton";
import ErrorP from "../components/ErrorP";
import ErrorDiv from "../components/ErrorDiv";

export default function RegistrationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUp, isAuthenticated, reqErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/opportunities");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    signUp(values);
  });

  return (
    <section className='flex items-center justify-center'>
      <div className='bg-orange-300 max-w-md p-10 rounded-md'>
        <h2 className='text-2xl font-bold'>Register</h2>
        <p className='flex gap-x-2 justify-between'>
          Already have an account?{" "}
          <Link to='/login' className='text-orange-950'>
            Sign in
          </Link>
        </p>
        {reqErrors && <ErrorDiv text={reqErrors} />}
        <form onSubmit={onSubmit}>
          <FormInput
            type='text'
            placeholder='Given name'
            {...register("given_name", { required: true })}
            autoFocus
          />
          {errors.given_name && <ErrorP text='Given name required' />}
          <FormInput
            type='text'
            placeholder='Family name'
            {...register("family_name", { required: true })}
          />
          {errors.family_name && <ErrorP text='Family name required' />}
          <FormInput
            type='date'
            {...register("birthdate", { required: true })}
          />
          {errors.birthdate && <ErrorP text='Birthdate required' />}
          <FormInput
            type='text'
            placeholder='Tax identifier/RFC'
            {...register("tax_identifier", { required: true })}
          />
          {errors.tax_identifier && (
            <ErrorP text='Tax identifier/RFC required' />
          )}
          <FormInput
            type='text'
            placeholder='National identifier/CURP'
            {...register("national_identifier", { required: true })}
          />
          {errors.national_identifier && (
            <ErrorP text='National identifier/CURP required' />
          )}
          <FormInput
            type='text'
            placeholder='Street'
            {...register("street", { required: true })}
          />
          {errors.street && <ErrorP text='Street required' />}
          <FormInput
            type='text'
            placeholder='External number'
            {...register("premise", { required: true })}
          />
          {errors.premise && <ErrorP text='External number required' />}
          <FormInput
            type='text'
            placeholder='Internal number'
            {...register("sub_premise", { required: false })}
          />
          <FormInput
            type='text'
            placeholder='Neighborhood/Suburb'
            {...register("dependent_locality", { required: true })}
          />
          {errors.dependent_locality && (
            <ErrorP text='Neighborhood/Suburb required' />
          )}
          <FormInput
            type='text'
            placeholder='City/Town'
            {...register("locality", { required: true })}
          />
          {errors.locality && <ErrorP text='City/Town required' />}
          <FormInput
            type='text'
            placeholder='Postal code'
            {...register("postal_code", { required: true })}
          />
          {errors.postal_code && <ErrorP text='Postal code required' />}
          <FormInput
            type='text'
            placeholder='State/Province'
            {...register("administrative_area", { required: true })}
          />
          {errors.administrative_area && (
            <ErrorP text='State/Province required' />
          )}
          <FormInput
            type='text'
            placeholder='Country'
            {...register("country", { required: true })}
          />
          {errors.country && <ErrorP text='Country required' />}
          <FormInput
            type='email'
            placeholder='Email'
            {...register("email", { required: true })}
          />
          {errors.email && <ErrorP text='Email required' />}
          <FormInput
            type='password'
            placeholder='Password'
            {...register("password", { required: true })}
          />
          {errors.password && <ErrorP text='Password required' />}
          <StyledButton text='Register' />
        </form>
      </div>
    </section>
  );
}
