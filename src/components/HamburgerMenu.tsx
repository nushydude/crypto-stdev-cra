import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useClickAway, useMedia } from 'react-use';
import {
  BottomBar,
  Container,
  HamburgerMenuMobile,
  MenuContainer,
  MenuItem,
  MiddleBar,
  TopBar,
} from './HamburgerMenu.styles';

type Props = {
  links: Array<{ to: string; label: string }>;
  headerHeight: number;
};

export const HamburgerMenu = ({ headerHeight, links }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const isMobile = useMedia('(max-width: 640px)');
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
