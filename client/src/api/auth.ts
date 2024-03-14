import Cookies from "js-cookie";
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

export async function getRequest(URL = "") {
  const cookies = Cookies.get();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
  };

  if (cookies.token) {
    headers["Authorization"] = `Bearer ${cookies.token}`;
  }

  const res = await fetch(`${API}/${URL}`, {
    headers: headers,
    credentials: "include",
  });

  return res.json();
}
