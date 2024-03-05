import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import { postData } from "../api/auth";

export default function RegistrationPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    const res = await postData("registration", values);
    console.log(res);
  });

  return (
    <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
      <h1>RegistrationPage</h1>
      <form onSubmit={onSubmit}>
        <FormInput
          type='text'
          placeholder='Given name'
          {...register("given_name", { required: true })}
        />
        <FormInput
          type='text'
          placeholder='Family name'
          {...register("family_name", { required: true })}
        />
        <FormInput type='date' {...register("birthdate", { required: true })} />
        <FormInput
          type='text'
          placeholder='Tax identifier/RFC'
          {...register("tax_identifier", { required: true })}
        />
        <FormInput
          type='text'
          placeholder='National identifier/CURP'
          {...register("national_identifier", { required: true })}
        />
        <FormInput
          type='text'
          placeholder='Street'
          {...register("street", { required: true })}
        />
        <FormInput
          type='text'
          placeholder='External number'
          {...register("premise", { required: true })}
        />
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
        <FormInput
          type='text'
          placeholder='City/Town'
          {...register("locality", { required: true })}
        />
        <FormInput
          type='text'
          placeholder='Postal code'
          {...register("postal_code", { required: true })}
        />
        <FormInput
          type='text'
          placeholder='State/Province'
          {...register("administrative_area", { required: true })}
        />
        <FormInput
          type='text'
          placeholder='Country'
          {...register("country", { required: true })}
        />
        <FormInput
          type='email'
          placeholder='Email'
          {...register("email", { required: true })}
        />
        <FormInput
          type='password'
          placeholder='Password'
          {...register("password", { required: true })}
        />
        <button>Register</button>
      </form>
    </div>
  );
}
