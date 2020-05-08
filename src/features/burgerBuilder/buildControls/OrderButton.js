import React from 'react';

function OrderButton({ handleClick, disabled, isAuthenticated }) {
  return (
    <button className="OrderButton" onClick={handleClick} disabled={disabled}>
      {isAuthenticated ? 'Order Now' : 'Log In to Order'}
    </button>
  );
}

export default OrderButton;
