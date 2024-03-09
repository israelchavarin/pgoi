export async function registerUser(data = {}) {
  const res = await fetch("http://localhost:3000/api/registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
