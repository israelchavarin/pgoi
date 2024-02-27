import { useState } from "react";
import useSendRequest from "../hooks/useSendRequest";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { handleSubmit, response, isLoading, error } = useSendRequest(
    "http://localhost:3000/api/login",
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
    console.log(document.cookie);
  };

  return (
    <>
      <h3> Iniciar sesión</h3>
      <form onSubmit={onSubmit}>
        <input
          type='email'
          name='email'
          value={formData.email}
          placeholder='Correo electrónico'
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          value={formData.password}
          placeholder='Contraseña'
          onChange={handleChange}
        />
        <button type='submit' disabled={isLoading}>
          {isLoading ? "Loading..." : "Iniciar sesión"}
        </button>
      </form>
      {error && <p>Error: {error.message}</p>}
      {response && <p>Response from server: {response}</p>}
    </>
  );
}
