import { NavLink } from 'react-router-dom';
import { useMeasure } from 'react-use';
import { config } from '../config';
import { routes } from '../config/routes';
import { HamburgerMenu } from './HamburgerMenu';
import {
  DesktopLinks,
  InternalWrapper,
  MobileContainer,
  Version,
  Wrapper,
} from './Header.styles';
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
    <Wrapper data-testid="header">
      <InternalWrapper ref={ref}>
        <DesktopLinks>
          {links.map(({ to, label }, idx) => (
            <NavLink key={idx} to={to} activeStyle={{ fontWeight: 'bold' }}>
              {label}
            </NavLink>
          ))}
        </DesktopLinks>

        <MobileContainer data-testid="mobile-container">
          <HamburgerMenu links={links} headerHeight={height} />
          <PageTitle />
        </MobileContainer>

        <Version>build {config.BUILD_NUMBER}</Version>
      </InternalWrapper>
    </Wrapper>
  );
};
