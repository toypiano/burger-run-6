import React from 'react';
import Burger from './burger/Burger';
import BuildControls from './buildControls/BuildControls';

const initialIngredients = {
  salad: 1,
  bacon: 1,
  cheese: 1,
  meat: 1,
};

function BurgerBuilder() {
  return (
    <div className="BurgerBuilder">
      <section className="BurgerBuilder__burger-wrapper">
        <Burger ingredients={initialIngredients} />
      </section>
      <BuildControls price={4.99} ingredients={initialIngredients} />
    </div>
  );
}

export default BurgerBuilder;
