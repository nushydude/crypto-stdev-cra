import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const HamburgerMenuMobile = styled.button<{ menuVisible: boolean }>`
  display: none;
  justify-content: space-between;
  flex-direction: column;
  height: 24px;
  width: 24px;

  /* disable all inherent styles */
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  @media (max-width: 640px) {
    display: flex;
  }
`;

export const Bar = styled.div<{ menuVisible?: boolean }>`
  height: 4px;
  background-color: white;
  width: 24px;
  transition: all 0.3s ease-in-out;
`;

export const TopBar = styled(Bar)`
  transform: ${({ menuVisible }) =>
    `scale(${menuVisible ? 1 : 1}, 1) rotate(${menuVisible ? 45 : 0}deg)`};
  transform-origin: top left;
  width: ${({ menuVisible }) => (menuVisible ? 30 : 24)}px;
`;

export const MiddleBar = styled(Bar)`
  opacity: ${({ menuVisible }) => (menuVisible ? 0 : 1)};
`;

export const BottomBar = styled(Bar)`
  transform: ${({ menuVisible }) =>
    `scale(${menuVisible ? 1 : 1}, 1) rotate(${menuVisible ? -45 : 0}deg)`};
  transform-origin: bottom left;
  width: ${({ menuVisible }) => (menuVisible ? 30 : 24)}px;
`;

export const MenuContainer = styled.div<{
  menuVisible: boolean;
  offsetTop: number;
}>`
  position: absolute;
  background-color: black;
  width: 100vw;
  top: ${({ offsetTop }) => offsetTop}px;
  left: -20px;
  height: ${({ menuVisible, offsetTop }) =>
    menuVisible ? `calc(100vh - ${offsetTop}px)` : 0};
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  z-index: 999;

  @media (max-width: 640px) {
    padding-top: 20px;
  }

  a:link {
    text-decoration: none;
    color: white;
  }

  a:visited {
    text-decoration: none;
    color: white;
  }

  a:hover {
    text-decoration: underline;
    color: white;
  }

  a:active {
    text-decoration: underline;
    color: white;
  }
`;

export const MenuItem = styled.div`
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid #ccc;
`;
