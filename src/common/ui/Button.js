import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  font: inherit;
`;

function Button({ children, handleClick, disabled }) {
  return (
    <StyledButton onClick={handleClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
}

export default Button;
