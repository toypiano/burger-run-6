import React from 'react';
import Ingredient from './Ingredient';

function mapIngredients(ingredients) {
  return Object.entries(ingredients).map(([ing, qty]) => {
    return [...Array(qty)].map((_, i) => (
      <Ingredient key={ing + i} type={ing} />
    ));
  });
}

function Burger({ ingredients }) {
  return (
    <div className="Burger">
      <Ingredient type="bread-top" />
      {mapIngredients(ingredients)}
      <Ingredient type="bread-bottom" />
    </div>
  );
}

export default Burger;
