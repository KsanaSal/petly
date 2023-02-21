import styled from 'styled-components';
import { theme, breakpoints } from '../../constants/theme';
import Modal from 'styled-react-modal';

export const Overlay = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 30;
  opacity: ${theme.colors.secondaryText};
  background-color: ${theme.colors.secondaryText};
`;

export const StyledModal = styled.div`
  position: relative;
  min-width: 280px;
  max-width: 440px;
  padding: 20px 20px 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  background-color: ${theme.colors.lightText};
  @media(min-width: ${breakpoints[1]}px) {
    width: 608px;
    padding: 20px 20px 40px 20px;
  }
`;

export const ButtonCloseModal = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  top: 20px;
  right: 20px;
  border: none;
  border-radius: 50%;
  background-color: ${theme.colors.mainBackground};
  cursor: pointer;
  &:hover,
  &:focus {
    color: ${theme.colors.accent};
  }
  @media(min-width: ${breakpoints[1]}px) {
    width: 44px;
    height: 44px;
    top: 28px;
    right: 28px;
  }
`;

// export const StyledModal = Modal.styled`
// position: relative;
//   width: 608px;

//   display: flex;
//   flex-direction: column;
//   padding: 40px 80px;
//   margin-top: 40ox;
//   align-items: center;
//   justify-content: center;
//   border-radius: 40px;
//   background-color: ${theme.colors.lightText};
// `;

// export const SpecialModalBackground = styled.div`
//   display: flex;
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   align-items: center;
//   justify-content: center;
//   z-index: 30;
//   opacity: ${theme.colors.secondaryText};
//   background-color: ${theme.colors.secondaryText};
// `;
