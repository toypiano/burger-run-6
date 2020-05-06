import React from 'react';
import styled from 'styled-components';

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: $z-backdrop;
  transition: opacity 150ms ease-in;
  opacity: ${(props) => (props.show ? 1 : 0)};
`;

function Backdrop({ show, handleClick }) {
  // need to conditionally render otherwise elements underneath backdrop are un-clickable.
  return show && <StyledBackdrop show={show} onClick={handleClick} />;
}

export default Backdrop;
