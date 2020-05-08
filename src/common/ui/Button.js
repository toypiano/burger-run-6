import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  font: inherit;
`;

function Button({ children, handleClick, disabled, type, variant }) {
  return (
    <StyledButton
      onClick={handleClick}
      disabled={disabled}
      type={type}
      variant={variant}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
