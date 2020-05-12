import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../../app/ducks/orders';
import Spinner from '../../common/ui/Spinner';
import { addEmoji } from '../../common/utils/index';

function Order({ ingredients, price, date }) {
  const orderDate = new Date(date).toLocaleString();
  return (
    <div className="Order">
      <div className="Order__ingredients">
        <h3>Ingredients</h3>
        {Object.entries(ingredients).map(([ing, qty]) => (
          <div className="Order__ingredient" key={ing}>
            <span className="Order__ingredient__ing">{addEmoji(ing)}</span>
            <span className="Order__ingredient__qty">{qty}</span>
          </div>
        ))}
      </div>
      <div className="Order__price">
        <h3>Price</h3>
        <p>${price.toFixed(2)}</p>
      </div>
      <p className="Order__date">{orderDate}</p>
    </div>
  );
}

function Orders() {
  const orders = useSelector((state) => state.orders.orders);
  const idToken = useSelector((state) => state.auth.idToken);
  const localId = useSelector((state) => state.auth.localId);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getOrders(idToken, localId)).then(() => setIsLoading(false));
  }, [dispatch, idToken, localId]);
  return (
    <>
      {!idToken && <Redirect to="/" />}
      {isLoading && <Spinner show={isLoading} />}
      <ul className={`Orders`}>
        {orders &&
          orders.map((order) => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
              date={order.date}
            />
          ))}
      </ul>
    </>
  );
}

export default Orders;
