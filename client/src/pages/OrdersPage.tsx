import { useEffect, useState } from "react";
import { getRequest } from "../api/auth";

type Order = {
  order_id: string;
  user_id: string;
  opportunity_id: string;
  investment_amount: number;
  agreed_percentage: string;
  term_in_days: number;
  active: true;
  createdAt: string;
  updatedAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");

  const getOrders = async () => {
    try {
      const res = await getRequest("orders");
      if (res.status !== 200) throw new Error(res.error || "Unknown error");
      setOrders(res.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setError(errorMessage);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (orders.length === 0) return <h1>You don't have orders yet.</h1>;

  if (error) return <h1>{error}</h1>;

  return (
    <section>
      <h2 className='text-2xl text-center'>Current orders</h2>
      <div className='grid grid-cols-3 gap-2'>
        {orders.map((order) => (
          <div key={order.order_id}>
            <h3>Opportunity: {order.opportunity_id}</h3>
            <p>Amount invested: {order.investment_amount}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
