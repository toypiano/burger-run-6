import React from 'react';
import Button from '../../../common/ui/Button';

function BuildControl({ label }) {
  return (
    <div className="BuildControl">
      <label>{label}</label>
      <Button>Less</Button>
      <Button>More</Button>
    </div>
  );
}

function BuildControls({ price, ingredients }) {
  const buildControls = Object.keys(ingredients).map((ing) => (
    <BuildControl key={ing} label={ing} />
  ));
  return (
    <div className="BuildControls">
      <p className="BuildControls__price">
        Total: $<span>{price.toFixed(2)}</span>
      </p>
      {buildControls}
    </div>
  );
}

export default BuildControls;
