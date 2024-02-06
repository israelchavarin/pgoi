import { useForm } from "react-hook-form";
import { registerRequest } from "../api/auth";

export default function RegistrationForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    const res = await registerRequest(values);
    console.log(res);
  });

  return (
    <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          {...register("given_name", { required: true })}
          placeholder='Nombre'
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <input
          type='text'
          {...register("family_name", { required: true })}
          placeholder='Apellido'
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <input
          type='date'
          {...register("birthdate", { required: true })}
          placeholder='Fecha de nacimiento'
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <input
          type='text'
          {...register("tax_identifier", { required: true })}
          placeholder='RFC'
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <input
          type='text'
          {...register("national_identifier", { required: true })}
          placeholder='CURP'
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <input
          type='text'
          {...register("street", { required: true })}
          placeholder='Calle'
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <input
          type='text'
          {...register("premise", { required: true })}
          placeholder='Número externo'
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <input
          type='text'
          {...register("sub_premise")}
          placeholder='Número interno'
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <input
          type='text'
          {...register("dependent_locality", { required: true })}
          placeholder='Colonia'
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <input
          type='text'
          {...register("locality", { required: true })}
          placeholder='Municipio'
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <input
          type='text'
          {...register("postal_code", { required: true })}
          placeholder='Código postal'
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <input
          type='text'
          {...register("administrative_area", { required: true })}
          placeholder='Estado'
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <input
          type='text'
          {...register("country", { required: true })}
          placeholder='País'
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <input
          type='email'
          {...register("email", { required: true })}
          placeholder='Correo electrónico'
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <input
          type='password'
          {...register("password", { required: true })}
          placeholder='Contraseña'
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <button type='submit'>Registrarse</button>
      </form>
    </div>
  );
}
