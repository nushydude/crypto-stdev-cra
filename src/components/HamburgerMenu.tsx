import { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useClickAway, useMedia } from 'react-use';
import {
  BottomBar,
  MenuContainer,
  MiddleBar,
  TopBar,
} from './HamburgerMenu.styles';
import { routes } from '../config/routes';
import { UserContext } from '../context/user';
import Version from './Version';

type Props = {
  links: Array<{ to: string; label: string; icon: string }>;
  headerHeight: number;
};

export const HamburgerMenu = ({ headerHeight, links }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const isMobile = useMedia('(max-width: 640px)');
  const { isLoggedIn, removeUser } = useContext(UserContext);

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
          <Link key={idx} to={to} className="no-underline">
            <div
              className="w-full p-4 border-b-2 border-solid border-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => setMenuVisible(false)}
            >
              {icon} {label}
            </div>
          </Link>
        ))}

        {!isLoggedIn ? (
          <div className="p-4 text-center flex justify-evenly gap-2">
            <Link
              className="w-full no-underline visited:text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded"
              to={routes.LOGIN}
              onClick={(e) => {
                e.stopPropagation();
                setMenuVisible(false);
              }}
            >
              <span className="text-white font-bold">Log in</span>
            </Link>

            <Link
              className="w-full no-underline bg-white py-2 px-4 rounded"
              to={routes.SIGNUP}
              onClick={(e) => {
                e.stopPropagation();
                setMenuVisible(false);
              }}
            >
              <span className="text-blue-500 hover:text-blue-700 font-bold">
                Sign up
              </span>
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-betweem p-4">
            <button
              className="w-full ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={(e) => {
                e.stopPropagation();
                removeUser();
                setMenuVisible(false);
              }}
            >
              Logout
            </button>
          </div>
        )}

        <div className="text-center">
          <Version />
        </div>
      </MenuContainer>
    </div>
  );
};
