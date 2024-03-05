const BASE_URL = "http://localhost:3000/api";

export async function postData(endPoint = "", data = {}) {
  const res = await fetch(`${BASE_URL}/${endPoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
