import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import Burger from '../burgerBuilder/burger/Burger';
import Button from '../../common/ui/Button';
import { getBurgerHeight } from '../../common/utils/';

const wrapperHeight = 300; // px

const moveUp = (ingredients) => {
  const burgerHeight = getBurgerHeight(ingredients, wrapperHeight);
  const offset = 30; // offset in px
  return css`
    margin-top: -${wrapperHeight - burgerHeight - offset}px;
  `;
};

const appear = keyframes`
  100% {
    opacity: 1;
  }  
`;

const StyledBurgerWrapper = styled.div`
  width: 300px;
  height: ${wrapperHeight}px;
  margin: auto;
  .Burger {
    background: transparent;
    justify-content: flex-end;
    opacity: 0;
    animation: ${appear} 200ms ease-out;
    animation-fill-mode: forwards;
    animation-delay: 600ms;
  }
  background: transparent;
  ${(props) => moveUp(props.ingredients)}
`;

function CheckoutSummary({
  ingredients,
  handleClickContinue,
  handleClickCancel,
}) {
  return (
    <div className={`CheckoutSummary`}>
      <h2>
        Your burger is <strong>ready for order!</strong>
      </h2>

      <StyledBurgerWrapper
        ingredients={ingredients}
        className="CheckoutSummary__burger-wrapper"
      >
        <Burger ingredients={ingredients} />
      </StyledBurgerWrapper>
      <div className="CheckoutSummary__buttons">
        <Button variant="danger" handleClick={handleClickCancel}>
          Cancel
        </Button>
        <Button variant="success" handleClick={handleClickContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default CheckoutSummary;
