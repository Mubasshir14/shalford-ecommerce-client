import OrderDetails from "@/components/Modules/Order/OrderDetails";
import { getSingleOrder } from "@/components/Services/Order";
import React from "react";

const OrderDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const { data: order } = await getSingleOrder(id);
  return (
    <div>
      <OrderDetails order={order} />
    </div>
  );
};

export default OrderDetailsPage;
