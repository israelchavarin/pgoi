import { useState } from "react";

function useSendRequest(apiEndpoint, method) {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(apiEndpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const apiResponse = await response.json();
      setResponse(JSON.stringify(apiResponse));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, response, isLoading, error };
}

export default useSendRequest;
