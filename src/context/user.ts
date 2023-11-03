import React from 'react';

export type UserContextType = {
  user: {
    accessToken?: string | null;
    refreshToken: string;
  } | null;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  removeUser: () => void;
  isLoggedIn: boolean;
  login: (refreshToken: string, accessToken: string) => void;
};

export const UserContext = React.createContext<UserContextType>({
  user: null,
  setAccessToken: () => {},
  setRefreshToken: () => {},
  removeUser: () => {},
  isLoggedIn: false,
  login: () => {},
});
