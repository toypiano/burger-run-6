import React from 'react';

function Ingredient({ type }) {
  return <div className={`Ingredient Ingredient__${type}`}>{type}</div>;
}

export default Ingredient;
