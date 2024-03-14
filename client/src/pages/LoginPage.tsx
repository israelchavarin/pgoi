import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <h2 className='text-2xl font-bold'>Login</h2>
        <form onSubmit={onSubmit}>
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
          <button>Login</button>
          {reqErrors && (
            <div className='bg-red-500 p-2 text-white text-center'>
              {reqErrors}
            </div>
          )}
        </form>

        <p className='flex gap-x-2 justify-between'>
          Don't have an account?{" "}
          <Link to='/registration' className='text-sky-500'>
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
