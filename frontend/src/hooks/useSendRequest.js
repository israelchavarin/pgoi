import { useState } from "react";
import Cookies from "js-cookie";

function useSendRequest(apiEndpoint, method) {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(apiEndpoint, {
        withCredentials: true,
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log(response.headers.get("Set-Cookie"));
      setResponse(JSON.stringify(responseData));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, response, isLoading, error };
}

export default useSendRequest;
