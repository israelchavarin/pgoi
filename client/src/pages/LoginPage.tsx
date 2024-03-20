import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import StyledButton from "../components/StyledButton";
import ErrorP from "../components/ErrorP";
import ErrorDiv from "../components/ErrorDiv";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, reqErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signIn(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/opportunities");
    }
  }, [isAuthenticated, navigate]);

  return (
    <section className='flex h-[calc(100vh-6.25rem)] items-center justify-center'>
      <div className='bg-orange-300 max-w-md w-full p-10 rounded-md'>
        <h2 className='text-2xl font-bold'>Login</h2>
        <form onSubmit={onSubmit}>
          <FormInput
            type='email'
            placeholder='Email'
            {...register("email", { required: true })}
            autoFocus
          />
          {errors.email && <ErrorP text='Email required' />}
          <FormInput
            type='password'
            placeholder='Password'
            {...register("password", { required: true })}
          />
          {errors.password && <ErrorP text='Password required' />}
          <StyledButton text='Login' />
          {reqErrors && <ErrorDiv text={reqErrors} />}
        </form>

        <p className='flex gap-x-2 justify-between'>
          Don't have an account?{" "}
          <Link to='/registration' className='text-orange-950'>
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
