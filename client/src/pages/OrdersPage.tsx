import { useAuth } from "../hooks/useAuth";

export default function OrdersPage() {
  const { user } = useAuth();
  console.log(user);

  return (
    <>
      <h1>OrdersPage</h1>
    </>
  );
}
