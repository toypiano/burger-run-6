import React from 'react';
import Ingredient from './Ingredient';
import styled from 'styled-components';

function mapIngredients(ingredients) {
  return Object.entries(ingredients).map(([ing, qty]) => {
    return [...Array(qty)].map((_, i) => (
      <Ingredient key={ing + i} type={ing} />
    ));
  });
}

const StyledBurger = styled.div`
  width: 350px;
  height: 90%;
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Burger({ ingredients }) {
  return (
    <StyledBurger className="Burger">
      <Ingredient type="bread-top">
        <Ingredient type="seeds1" />
        <Ingredient type="seeds2" />
      </Ingredient>
      {mapIngredients(ingredients)}
      <Ingredient type="bread-bottom" />
    </StyledBurger>
  );
}

export default Burger;
