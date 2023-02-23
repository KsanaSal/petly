import React from 'react';
import {
  Modal,
  Container,
  AuthBox,
  iconStyle,
  Button,
  Link,
  Span,
  Overlay,
} from './MobMenu.styled';
import PropTypes from 'prop-types';
import { VscChromeClose } from 'react-icons/vsc';
import Nav from 'components/Nav/Nav';
import AuthNav from 'components/AuthNav';
import UserNav from 'components/UserNav';
import { mobileMenuAnimation, pageAnimation } from 'constants/animation';

const MobMenu = ({ closeMenu, isAuth, loginIsActive, closeMenuRegister }) => {
  const backdropClickCloseMenu = e => {
    if (e.currentTarget === e.target) {
      closeMenu();
    }
  };

  return (
    <Overlay onClick={backdropClickCloseMenu} {...pageAnimation}>
      <Modal
        key="mobile"
        {...mobileMenuAnimation}
        transition={{ duration: 0.3 }}
      >
        <Container>
          <Link to="/" end onClick={closeMenu}>
            pe<Span>t</Span>ly
          </Link>
          <Button onClick={closeMenu}>
            <VscChromeClose style={iconStyle} />
          </Button>
        </Container>
        <AuthBox>
          {isAuth ? (
            <UserNav closeMenu={closeMenu} />
          ) : (
            <AuthNav
              closeMenu={closeMenu}
              loginIsActive={loginIsActive}
              closeMenuRegister={closeMenuRegister}
            />
          )}
        </AuthBox>
        <Nav closeMenu={closeMenu} />
      </Modal>
    </Overlay>
  );
};

MobMenu.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  loginIsActive: PropTypes.bool.isRequired,
  closeMenuRegister: PropTypes.func.isRequired,
};

export default MobMenu;
