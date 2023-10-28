import { NavLink } from 'react-router-dom';
import { useMeasure } from 'react-use';
import { config } from '../config';
import { routes } from '../config/routes';
import { HamburgerMenu } from './HamburgerMenu';
import { PageTitle } from './PageTitle';

const links = [
  { to: routes.SINGLE, label: 'Single Token' },
  { to: routes.BEST_DCA, label: 'Best DCA' },
  { to: routes.BEST_BUY, label: 'Best Buy' },
  { to: routes.SETTINGS, label: 'Settings' },
];

export const Header = () => {
  const [ref, { height }] = useMeasure<HTMLDivElement>();

  return (
    <div
      data-testid="header"
      className="px-2 bg-black text-white mb-2 fixed h-14 top-0 left-0 right-0 z-10 shadow-sm pt-4 pb-4 sm:h-10 sm:pt-2 sm:pb-2"
    >
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-2 flex justify-between align-middle"
      >
        <div className="hidden sm:block">
          {links.map(({ to, label }, idx) => (
            <NavLink
              className="mr-4 text-white hover:text-gray-300"
              key={idx}
              to={to}
              activeStyle={{ fontWeight: 'bold' }}
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div
          data-testid="mobile-container"
          className="flex align-middle sm:hidden"
        >
          <HamburgerMenu links={links} headerHeight={height} />
          <PageTitle />
        </div>

        <span className="inline-block">build {config.BUILD_NUMBER}</span>
      </div>
    </div>
  );
};
