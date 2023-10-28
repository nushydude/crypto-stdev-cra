import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../config/routes';

const pageTitles = {
  [routes.BEST_BUY]: 'Best Buy',
  [routes.BEST_DCA]: 'Best DCA',
  [routes.SETTINGS]: 'Settings',
  [routes.SINGLE]: 'Single token',
};

const Span = styled.span`
  color: white;
  display: inline-block;
  margin-left: 20px;
  font-weight: bold;
`;

export const PageTitle = () => {
  const location = useLocation();

  return <Span>{pageTitles[location.pathname]}</Span>;
};
