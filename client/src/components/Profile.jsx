import useSendRequest from "../hooks/useSendRequest";

export default function Profile() {
  const { handleSubmit, response, isLoading, error } = useSendRequest(
    "http://localhost:3000/api/profile",
    "GET"
  );

  return (
    <>
      <h3>Perfil de Usuario</h3>
      <button onClick={() => handleSubmit()} disabled={isLoading}>
        {isLoading ? "Loading..." : "Consultar"}
      </button>
      {error && <p>Error: {error.message}</p>}
      {response && <p>Response from server: {response}</p>}
    </>
  );
}
