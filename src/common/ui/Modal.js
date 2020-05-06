import React from 'react';
import styled from 'styled-components';

import Backdrop from './Backdrop';

const toggleSlide = (props) =>
  props.show ? `translateY(0)` : `translateY(-100vh)`;

const StyledModal = styled.div`
  .Modal__content {
    position: fixed;
    width: 80%;
    max-width: 30rem;
    left: 50vw;
    top: 50vh;
    transition: transform 200ms ease-in-out;
    transform: translate(-50%, -50%) ${toggleSlide};
    background: var(--cl-light);
    text-align: center;
  }
`;

function Modal({ children, show, closeModal }) {
  return (
    <StyledModal show={show}>
      <Backdrop show={show} handleClick={closeModal} />
      <section className="Modal__content">{children}</section>
    </StyledModal>
  );
}

export default Modal;
