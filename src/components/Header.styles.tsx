import styled from 'styled-components';

export const Wrapper = styled.div`
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

  @media (max-width: 640px) {
    padding-top: 20px;
    padding-bottom: 20px;
    height: 64px;
  }
`;

export const InternalWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MobileContainer = styled.div`
  display: none;

  @media (max-width: 640px) {
    display: flex;
    align-items: center;
  }
`;

export const DesktopLinks = styled.nav`
  @media (max-width: 640px) {
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

export const Version = styled.span`
  display: inline-block;
`;
