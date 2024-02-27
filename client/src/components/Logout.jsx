import useSendRequest from "../hooks/useSendRequest";

export default function Logout() {
  const { handleSubmit, response, isLoading, error } = useSendRequest(
    "http://localhost:3000/api/logout",
    "POST"
  );

  return (
    <>
      <h3> Cerrar sesión</h3>
      <button onClick={() => handleSubmit()} disabled={isLoading}>
        {isLoading ? "Loading..." : "Cerrar sesión"}
      </button>
      {error && <p>Error: {error.message}</p>}
      {response && <p>Response from server: {response}</p>}
    </>
  );
}
