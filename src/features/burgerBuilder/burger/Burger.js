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
  width: 80%;
  min-width: 300px;
  max-width: 40vh;
  height: 100%;
  padding: 1em 0;
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
