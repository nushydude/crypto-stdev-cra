import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useClickAway, useMedia } from 'react-use';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;

const HamburgerMenuMobile = styled.button<{ menuVisible: boolean }>`
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

  @media (max-width: 690px) {
    display: flex;
  }
`;

const Bar = styled.div<{ menuVisible?: boolean }>`
  height: 4px;
  background-color: white;
  width: 24px;
  transition: all 0.3s ease-in-out;
`;

const TopBar = styled(Bar)`
  transform: ${({ menuVisible }) =>
    `scale(${menuVisible ? 1 : 1}, 1) rotate(${menuVisible ? 45 : 0}deg)`};
  transform-origin: top left;
  width: ${({ menuVisible }) => (menuVisible ? 30 : 24)}px;
`;

const MiddleBar = styled(Bar)`
  opacity: ${({ menuVisible }) => (menuVisible ? 0 : 1)};
`;

const BottomBar = styled(Bar)`
  transform: ${({ menuVisible }) =>
    `scale(${menuVisible ? 1 : 1}, 1) rotate(${menuVisible ? -45 : 0}deg)`};
  transform-origin: bottom left;
  width: ${({ menuVisible }) => (menuVisible ? 30 : 24)}px;
`;

const MenuContainer = styled.div<{ menuVisible: boolean; offsetTop: number }>`
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

  @media (max-width: 690px) {
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

const MenuItem = styled.div`
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid #ccc;
`;

type Props = {
  links: Array<{ to: string; label: string }>;
  headerHeight: number;
};

export const HamburgerMenu = ({ headerHeight, links }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const isMobile = useMedia('(max-width: 690px)');
  useClickAway(ref, () => {
    setMenuVisible(false);
  });

  // handle an edge-case where a user would make the window narrow, open the menu and then widen it.
  useEffect(() => {
    if (menuVisible && !isMobile) {
      setMenuVisible(false);
    }
  }, [isMobile, menuVisible]);

  return (
    <Container ref={ref}>
      <HamburgerMenuMobile
        onClick={() => setMenuVisible((visible) => !visible)}
        menuVisible={menuVisible}
      >
        <TopBar menuVisible={menuVisible} />
        <MiddleBar menuVisible={menuVisible} />
        <BottomBar menuVisible={menuVisible} />
      </HamburgerMenuMobile>

      <MenuContainer menuVisible={menuVisible} offsetTop={headerHeight}>
        {links.map(({ to, label }, idx) => (
          <Link key={idx} to={to}>
            <MenuItem onClick={() => setMenuVisible(false)}>{label}</MenuItem>
          </Link>
        ))}
      </MenuContainer>
    </Container>
  );
};
