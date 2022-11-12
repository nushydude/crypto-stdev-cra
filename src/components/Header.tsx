import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 10px;
  background: #000;
  color: #fff;
  margin-bottom: 10px;
`;

const InternalWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 10px;
`;

const Links = styled.div`
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

export const Header: React.FC = () => {
  return (
    <Wrapper data-testid="header">
      <InternalWrapper>
        <Links>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/best-dca">Best DCA</NavLink>
          <NavLink to="/best-buy">Best Buy</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </Links>
      </InternalWrapper>
    </Wrapper>
  );
};
