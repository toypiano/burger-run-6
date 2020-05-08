import React, { useEffect, useState } from 'react';
import Burger from './burger/Burger';
import BuildControls from './buildControls/BuildControls';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as actionCreators from '../../app/ducks/burgerBuilder';
import { setAuthRedirect } from '../../app/ducks/auth';

import Spinner from '../../common/ui/Spinner';
import Modal from '../../common/ui/Modal';
import OrderSummary from './OrderSummary';

export function BurgerBuilder({
  ingredients,
  price,
  addIngredient,
  removeIngredient,
  fetchIngredients,
  isOrdering,
  beginOrder,
  signInToOrder,
  cancelOrder,
  isAuthenticated,
  setAuthRedirect,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        await fetchIngredients();
        setIsFetched(true);
      } catch (err) {}
      setIsLoading(false);
    })();
  }, [fetchIngredients, cancelOrder]);

  /**
   * proceed to checkout page
   */
  const proceedToCheckout = () => {
    history.push('/checkout');
  };

  const orderNow = () => {
    if (isAuthenticated) {
      beginOrder();
    } else {
      signInToOrder();
      setAuthRedirect('/checkout');
      history.push('/auth');
    }
  };

  return (
    <div className="BurgerBuilder">
      <Spinner show={isLoading} />
      <Modal show={isFetched && isOrdering} closeModal={cancelOrder}>
        <OrderSummary
          ingredients={ingredients}
          cancelOrder={cancelOrder}
          proceedToCheckout={proceedToCheckout}
        />
      </Modal>
      <section className="BurgerBuilder__burger-wrapper">
        <Burger ingredients={ingredients} />
      </section>
      <BuildControls
        price={price}
        ingredients={ingredients}
        add={addIngredient}
        remove={removeIngredient}
        orderNow={orderNow}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
}

const mapState = (state) => {
  const {
    burgerBuilder: { ingredients, price, isOrdering },
    auth: { idToken },
  } = state;

  return { ingredients, price, isOrdering, isAuthenticated: idToken !== null };
};

export default connect(mapState, { setAuthRedirect, ...actionCreators })(
  BurgerBuilder
);
