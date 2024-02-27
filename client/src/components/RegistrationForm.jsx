import { useState } from "react";
import useSendRequest from "../hooks/useSendRequest";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    given_name: "",
    family_name: "",
    birthdate: "",
    tax_identifier: "",
    national_identifier: "",
    street: "",
    premise: "",
    sub_premise: "",
    dependent_locality: "",
    locality: "",
    postal_code: "",
    administrative_area: "",
    country: "",
    email: "",
    password: "",
  });
  const { handleSubmit, response, isLoading, error } = useSendRequest(
    "http://localhost:3000/api/registration",
    "POST"
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <>
      <h3>Registrarse</h3>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Nombre'
          name='given_name'
          value={formData.given_name}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Apellido'
          name='family_name'
          value={formData.family_name}
          onChange={handleChange}
        />
        <input
          type='date'
          placeholder='Fecha de nacimiento'
          name='birthdate'
          value={formData.birthdate}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='RFC'
          name='tax_identifier'
          value={formData.tax_identifier}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='CURP'
          name='national_identifier'
          value={formData.national_identifier}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Calle'
          name='street'
          value={formData.street}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Número externo'
          name='premise'
          value={formData.premise}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Número interno'
          name='sub_premise'
          value={formData.sub_premise}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Colonia'
          name='dependent_locality'
          value={formData.dependent_locality}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Municipio'
          name='locality'
          value={formData.locality}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Código postal'
          name='postal_code'
          value={formData.postal_code}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Estado'
          name='administrative_area'
          value={formData.administrative_area}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='País'
          name='country'
          value={formData.country}
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Correo electrónico'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Contraseña'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
        <button type='submit' disabled={isLoading}>
          {isLoading ? "Loading..." : "Registrarse"}
        </button>
      </form>
      {error && <p>Error: {error.message}</p>}
      {response && <p>Response from server: {response}</p>}
    </>
  );
}
