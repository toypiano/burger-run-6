import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Orders() {
  const orders = useSelector((state) => state.orders);
  return <div className={`Orders`}></div>;
}

export default Orders;
