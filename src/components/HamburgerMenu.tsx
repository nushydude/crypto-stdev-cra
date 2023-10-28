import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useClickAway, useMedia } from 'react-use';
import {
  BottomBar,
  MenuContainer,
  MiddleBar,
  TopBar,
} from './HamburgerMenu.styles';

type Props = {
  links: Array<{ to: string; label: string; icon: string }>;
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
    <div className="relative" ref={ref}>
      <button
        onClick={() => setMenuVisible((visible) => !visible)}
        className="flex flex-col justify-between h-6 w-6 bg-transparent border-none outline-none cursor-pointer"
      >
        <TopBar menuVisible={menuVisible} />
        <MiddleBar menuVisible={menuVisible} />
        <BottomBar menuVisible={menuVisible} />
      </button>

      <MenuContainer menuVisible={menuVisible} offsetTop={headerHeight}>
        {links.map(({ to, label, icon }, idx) => (
          <Link key={idx} to={to}>
            <div
              className="w-full p-4 border-b-2 border-solid border-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => setMenuVisible(false)}
            >
              {icon} {label}
            </div>
          </Link>
        ))}
      </MenuContainer>
    </div>
  );
};
