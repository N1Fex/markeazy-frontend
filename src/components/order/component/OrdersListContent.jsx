import React from 'react';
import {Stack} from "@mui/material";
import OrderItem from "./OrderItem";

const OrdersListContent = ({orders}) => {

  console.log(orders);

  return (
      <Stack direction="column" spacing={2} paddingY={2} maxWidth="md" marginX={"auto"}>
        {orders.map(order => (
            <OrderItem
                key={order.id}
                id={order.id}
                date={new Date(order.date)}
                amount={order.amount}
                status={order.status}
                totalSum={order.totalSum} />
        ))}
      </Stack>
  );
};

export default OrdersListContent;