import React, { useEffect, useState } from 'react';
import Burger from './burger/Burger';
import BuildControls from './buildControls/BuildControls';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as actionCreators from '../../app/ducks/burgerBuilder';

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
  cancelOrder,
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

  const proceedToOrder = () => {
    history.push('/checkout');
  };

  return (
    <div className="BurgerBuilder">
      <Spinner show={isLoading} />
      <Modal show={isFetched && isOrdering} closeModal={cancelOrder}>
        <OrderSummary
          ingredients={ingredients}
          cancelOrder={cancelOrder}
          continueOrder={proceedToOrder}
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
        beginOrder={beginOrder}
      />
    </div>
  );
}

const mapState = (state) => {
  const {
    burgerBuilder: { ingredients, price, isOrdering },
  } = state;

  return { ingredients, price, isOrdering };
};

export default connect(mapState, actionCreators)(BurgerBuilder);
