import React from 'react';
import styled, { css } from 'styled-components';

const seed = (left, top, deg) => {
  return css`
    width: 10%;
    height: 15%;
    position: absolute;
    background: white;
    left: ${left};
    top: ${top};
    border-radius: 40%;
    transform: rotate(${deg});
    box-shadow: inset -2px -3px #c9c9c9;
    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background: white;
      position: relative;
      border-radius: 40%;
      left: -170%;
      top: -260%;
      transform: rotate(60deg);
      box-shadow: inset -1px -3px #c9c9c9;
    }
  `;
};

const breadTop = css`
  width: 80%;
  height: 20%;
  margin: 1% auto;
  background: linear-gradient(#bc581e, #e27b36);
  border-radius: 50% 50% 0 0;
  position: relative;
`;

const breadBottom = css`
  width: 80%;
  height: 13%;
  margin: 1% auto;
  background: linear-gradient(#bc581e, #e27b36);
  border-radius: 0 0 30px 30px;
`;

const salad = css`
  width: 85%;
  height: 7%;
  border-radius: 20px;
  background: linear-gradient(#56ab2f, #a8e063);
  margin: 1% auto;
`;

const bacon = css`
  width: 80%;
  height: 3%;
  border-radius: 20px;
  background: linear-gradient(#bf3813, #c45e38);
  margin: 1% auto;
`;

const cheese = css`
  width: 90%;
  height: 5%;
  border-radius: 20px;
  background: linear-gradient(#ffb347, #ffcc33);
  margin: 1% auto;
`;

const meat = css`
  width: 80%;
  height: 8%;
  border-radius: 20px;
  background: linear-gradient(#7f3608, #702e05);
  margin: 1% auto;
`;

const getCSS = (type) => {
  switch (type) {
    case 'bread-top':
      return breadTop;
    case 'seeds1':
      return seed('30%', '50%', '-20deg');
    case 'seeds2':
      return seed('60%', '35%', '-190deg');
    case 'bread-bottom':
      return breadBottom;
    case 'salad':
      return salad;
    case 'bacon':
      return bacon;
    case 'cheese':
      return cheese;
    case 'meat':
      return meat;
    default:
      return null;
  }
};

const StyledIngredient = styled.div`
  ${(props) => getCSS(props.type)}
`;

function Ingredient({ type, children }) {
  return <StyledIngredient type={type}>{children}</StyledIngredient>;
}

export default Ingredient;
