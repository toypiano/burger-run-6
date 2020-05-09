import React from 'react';
import Button from '../../common/ui/Button';
import { addEmoji } from '../../common/utils';

/**
 * Show selected ingredients with cancel & continue Button
 * @param {*} ingredients object of ingredients
 */
function OrderSummary({ ingredients, cancelOrder, proceedToCheckout }) {
  const ingredientLists = Object.entries(ingredients).map(([ing, qty]) => (
    <li key={ing}>
      <span className="OrderSummary__ingredient">{addEmoji(ing)}</span>
      <span className="OrderSummary__quantity">{qty}</span>
    </li>
  ));
  return (
    <div className="OrderSummary">
      <h3>Your Order</h3>
      <p>A tasty burger with the following ingredients!</p>
      <ul>{ingredientLists}</ul>
      <div className="OrderSummary__buttons">
        <Button variant="danger" handleClick={cancelOrder}>
          Cancel
        </Button>
        <Button variant="success" handleClick={proceedToCheckout}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default OrderSummary;
