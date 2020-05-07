import React from 'react';

import Burger from '../burgerBuilder/burger/Burger';
import Button from '../../common/ui/Button';

function CheckoutSummary({
  ingredients,
  handleClickContinue,
  handleClickCancel,
}) {
  return (
    <div className={`CheckoutSummary`}>
      <h2>Your burger is ready for order!</h2>
      <div className="CheckoutSummary__burger-wrapper">
        <Burger ingredients={ingredients} />
      </div>
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
