import { NavLink } from 'react-router-dom';
import { useMeasure } from 'react-use';
import styled from 'styled-components';
import { routes } from '../config/routes';
import { HamburgerMenu } from './HamburgerMenu';
import { PageTitle } from './PageTitle';

const Wrapper = styled.div`
  padding: 10px;
  background: #000;
  color: #fff;
  margin-bottom: 10px;
  position: fixed;
  height: 40px;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -6px 10px 5px rgba(0, 0, 0, 0.5);

  @media (max-width: 690px) {
    padding-top: 20px;
    padding-bottom: 20px;
    height: 64px;
  }
`;

const InternalWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MobileContainer = styled.div`
  display: none;

  @media (max-width: 690px) {
    display: flex;
    align-items: center;
  }
`;

const DesktopLinks = styled.nav`
  @media (max-width: 690px) {
    display: none;
  }

  > * {
    margin-right: 20px;
  }

  a {
    color: #fff;
    text-decoration: none;
    user-select: none;

    :hover {
      text-decoration: underline;
    }
  }
`;

const Version = styled.span`
  display: inline-block;
`;

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

        <Version>build {process.env.REACT_APP_BUILD_NUMBER}</Version>
      </InternalWrapper>
    </Wrapper>
  );
};
