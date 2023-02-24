import React from 'react';
import PropTypes from 'prop-types';
import { OverlayStyled } from './Overlay.styled';
import { pageAnimation } from 'constants/animation';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal');

const Overlay = ({ children, closeHandler }) => {
  const handleClick = e => closeHandler(e);

  return createPortal(
    <OverlayStyled
      onClick={handleClick}
      {...pageAnimation}
      transition={{ duration: 0.3 }}
    >
      {children}
    </OverlayStyled>,
    modalRoot
  );
};

Overlay.propTypes = {
  children: PropTypes.node,
  closeHandler: PropTypes.func,
};

export default Overlay;
