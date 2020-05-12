import React from 'react';
import styled, { css } from 'styled-components';

const primaryCss = css`
  background: var(--cl-primary);
  border: 2px solid var(--cl-primary);
  &:hover,
  &:focus {
    filter: brightness(1.2);
  }
`;

const secondaryCss = css`
  background: var(--cl-secondary);
  border: 2px solid var(--cl-secondary);
  &:hover,
  &:focus {
    filter: brightness(1.2);
  }
`;

const outlineSecondaryCss = css`
  background: transparent;
  border: 2px solid var(--cl-secondary);
  &:hover,
  &:focus {
    filter: brightness(0.9);
  }
`;

const successCss = css`
  background: var(--cl-success);
  border: 2px solid var(--cl-success);
  &:hover,
  &:focus {
    filter: brightness(1.1);
  }
`;

const outlineSuccessCss = css`
  background: transparent;
  border: 2px solid var(--cl-success);
  color: var(--cl-success);

  &:hover {
    color: var(--cl-light);
    background: var(--cl-success);
  }
  &:focus {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  }
`;

const dangerCss = css`
  background: var(--cl-danger);
  border: 2px solid var(--cl-danger);
  &:hover,
  &:focus {
    filter: brightness(1.1);
  }
`;

const getVariantCss = (variant) => {
  switch (variant) {
    case 'primary':
      return primaryCss;
    case 'secondary':
      return secondaryCss;
    case 'outline-secondary':
      return outlineSecondaryCss;
    case 'success':
      return successCss;
    case 'outline-success':
      return outlineSuccessCss;
    case 'danger':
      return dangerCss;
    default:
      return null;
  }
};

const StyledButton = styled.button`
  font: inherit;
  font-weight: var(--fw-bold);
  text-transform: uppercase;
  color: var(--cl-light);
  padding: 0.5em 1em;
  border-radius: 5px;
  min-width: 5em;
  margin: 0 0.25em;
  transition: all 200ms ease;
  ${(props) => getVariantCss(props.variant)}
  &:active {
    filter: brightness(1.1) opacity(0.8);
    position: relative;
  }
  /* &:focus {
    outline: none;
  } */
`;

function Button({ children, handleClick, disabled, type, variant }) {
  return (
    <StyledButton
      className="Button"
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
