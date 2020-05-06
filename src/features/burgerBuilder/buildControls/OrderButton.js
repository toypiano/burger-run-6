import React from 'react';

function OrderButton({ handleClick, disabled }) {
  return (
    <button className="OrderButton" onClick={handleClick} disabled={disabled}>
      Order Now
    </button>
  );
}

export default OrderButton;
