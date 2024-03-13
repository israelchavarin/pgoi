const API = "http://localhost:3000/api";

export async function postRequest(URL = "", data = {}) {
  const res = await fetch(`${API}/${URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
    // necessary for the browser to be able to get the cookie set by the backend
    // may be blocked by CORS policy if in the backend,
    // the cors config doesn't include the property credentials: true
  });
  return res.json();
}
