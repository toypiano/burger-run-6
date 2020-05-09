import React from 'react';
import Button from '../../../common/ui/Button';
import OrderButton from './OrderButton';
import { addEmoji } from '../../../common/utils';

function BuildControl({ label, less, more, disabled }) {
  return (
    <div className="BuildControl">
      <label>{addEmoji(label)}</label>
      <Button
        variant="outline-secondary"
        handleClick={less}
        disabled={disabled}
      >
        Less
      </Button>
      <Button variant="secondary" handleClick={more}>
        More
      </Button>
    </div>
  );
}

function BuildControls({
  price,
  ingredients,
  add,
  remove,
  orderNow,
  isAuthenticated,
}) {
  const buildControls = Object.keys(ingredients).map((ing) => (
    <BuildControl
      key={ing}
      label={ing}
      more={() => add(ing)}
      less={() => remove(ing)}
      disabled={ingredients[ing] <= 0}
    />
  ));

  const isAtLeastOneIngredient = () => {
    const quantitySum = Object.values(ingredients).reduce(
      (sum, qty) => sum + qty
    );
    return quantitySum >= 1;
  };
  return (
    <div className="BuildControls">
      <p className="BuildControls__price">
        Total: $<span>{price.toFixed(2)}</span>
      </p>
      {buildControls}
      <OrderButton
        handleClick={orderNow}
        disabled={!isAtLeastOneIngredient()}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
}

export default BuildControls;
