import React from 'react';

function Ingredient({ type, children }) {
  return <div className={`Ingredient Ingredient--${type}`}>{children}</div>;
}

export default Ingredient;
