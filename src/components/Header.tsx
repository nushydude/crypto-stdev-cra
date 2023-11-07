import { Link, NavLink } from 'react-router-dom';
import { useMeasure } from 'react-use';
import { routes } from '../config/routes';
import { HamburgerMenu } from './HamburgerMenu';
import { PageTitle } from './PageTitle';
import Version from './Version';
import { useContext } from 'react';
import { UserContext } from '../context/user';
import ProfileLink from './ProfileLink';

const links = [
  { to: routes.SINGLE, label: 'Single Token', icon: '📈' },
  { to: routes.BEST_DCA, label: 'Best DCA', icon: '🏆' },
  { to: routes.BEST_BUY, label: 'Best Buy', icon: '🏆' },
  { to: routes.SETTINGS, label: 'Settings', icon: '⚙️' },
];

export const Header = () => {
  const [ref, { height }] = useMeasure<HTMLDivElement>();
  const { removeUser, isLoggedIn } = useContext(UserContext);

  return (
    <div
      data-testid="header"
      ref={ref}
      className="w-full px-2 bg-black text-white mb-2 fixed h-14 top-0 left-0 right-0 z-10 shadow-sm pt-4 pb-4 sm:h-12 sm:pt-2 sm:pb-2"
    >
      <div className="max-w-7xl mx-auto px-2 flex justify-between align-middle">
        <div className="hidden sm:flex sm:items-center">
          {links.map(({ to, label, icon }, idx) => (
            <NavLink
              className="mr-8 text-white hover:text-gray-300"
              key={idx}
              to={to}
              activeStyle={{ fontWeight: 'bold' }}
            >
              {icon} {label}
            </NavLink>
          ))}
        </div>

        <div
          data-testid="mobile-container"
          className="flex align-middle sm:hidden"
        >
          <HamburgerMenu links={links} headerHeight={height + 16} />
          <PageTitle />
        </div>

        <div className="hidden sm:flex sm:items-center">
          <div className="mr-4">
            <Version />
          </div>
          {!isLoggedIn ? (
            <>
              <Link
                className="no-underline visited:text-white bg-blue-500 hover:bg-blue-700 py-1 px-2 rounded mr-2"
                to={routes.LOGIN}
              >
                <span className="text-white font-bold">Log in</span>
              </Link>

              <Link
                className=" no-underline bg-white py-1 px-2  rounded"
                to={routes.SIGNUP}
              >
                <span className="text-blue-500 hover:text-blue-700 font-bold">
                  Sign up
                </span>
              </Link>
            </>
          ) : (
            <>
              <ProfileLink size={28} />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded ml-4"
                onClick={() => {
                  removeUser();
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
        {/* <Version /> */}
      </div>
    </div>
  );
};
