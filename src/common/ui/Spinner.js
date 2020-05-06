import React from 'react';
import styled from 'styled-components';
import Backdrop from './Backdrop';
import classes from './Spinner.module.css';

const StyledSpinner = styled.div`
  .loader {
    position: fixed;
    z-index: $z-spinner;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, calc(-50%));
  }
`;

function Spinner({ show }) {
  return (
    <StyledSpinner>
      <Backdrop show={show} />
      {show && <div className={classes.loader + ' loader'}>Loading...</div>}
    </StyledSpinner>
  );
}

export default Spinner;
