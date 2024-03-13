const API = "http://localhost:3000/api";

export async function postRequest(URL = "", data = {}) {
  const res = await fetch(`${API}/${URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
