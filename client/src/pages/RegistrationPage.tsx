import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <section className='bg-zinc-800 max-w-md p-10 rounded-md'>
      <p className='flex gap-x-2 justify-between'>
        Already have an account?{" "}
        <Link to='/login' className='text-sky-500'>
          Sign in
        </Link>
      </p>
      {reqErrors && (
        <div className='bg-red-500 p-2 text-white'>{reqErrors}</div>
      )}
      <form onSubmit={onSubmit}>
        <FormInput
          type='text'
          placeholder='Given name'
          {...register("given_name", { required: true })}
          autoFocus
        />
        {errors.given_name && (
          <p className='text-red-500'>Given name required</p>
        )}
        <FormInput
          type='text'
          placeholder='Family name'
          {...register("family_name", { required: true })}
        />
        {errors.family_name && (
          <p className='text-red-500'>Family name required</p>
        )}
        <FormInput type='date' {...register("birthdate", { required: true })} />
        {errors.birthdate && <p className='text-red-500'>Birthdate required</p>}
        <FormInput
          type='text'
          placeholder='Tax identifier/RFC'
          {...register("tax_identifier", { required: true })}
        />
        {errors.tax_identifier && (
          <p className='text-red-500'>Tax identifier/RFC required</p>
        )}
        <FormInput
          type='text'
          placeholder='National identifier/CURP'
          {...register("national_identifier", { required: true })}
        />
        {errors.national_identifier && (
          <p className='text-red-500'>National identifier/CURP required</p>
        )}
        <FormInput
          type='text'
          placeholder='Street'
          {...register("street", { required: true })}
        />
        {errors.street && <p className='text-red-500'>Street required</p>}
        <FormInput
          type='text'
          placeholder='External number'
          {...register("premise", { required: true })}
        />
        {errors.premise && (
          <p className='text-red-500'>External number required</p>
        )}
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
          <p className='text-red-500'>Neighborhood/Suburb required</p>
        )}
        <FormInput
          type='text'
          placeholder='City/Town'
          {...register("locality", { required: true })}
        />
        {errors.locality && <p className='text-red-500'>City/Town required</p>}
        <FormInput
          type='text'
          placeholder='Postal code'
          {...register("postal_code", { required: true })}
        />
        {errors.postal_code && (
          <p className='text-red-500'>Postal code required</p>
        )}
        <FormInput
          type='text'
          placeholder='State/Province'
          {...register("administrative_area", { required: true })}
        />
        {errors.administrative_area && (
          <p className='text-red-500'>State/Province required</p>
        )}
        <FormInput
          type='text'
          placeholder='Country'
          {...register("country", { required: true })}
        />
        {errors.country && <p className='text-red-500'>Country required</p>}
        <FormInput
          type='email'
          placeholder='Email'
          {...register("email", { required: true })}
        />
        {errors.email && <p className='text-red-500'>Email required</p>}
        <FormInput
          type='password'
          placeholder='Password'
          {...register("password", { required: true })}
        />
        {errors.password && <p className='text-red-500'>Password required</p>}
        <button>Register</button>
      </form>
    </section>
  );
}
