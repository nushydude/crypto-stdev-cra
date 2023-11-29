import React from 'react';

export type Profile = {
  firstname: string;
  lastname: string;
  email: string;
  settings: Record<string, any> | null;
};

export type UserContextType = {
  fetchAccessToken: () => any;
  isLoggedIn: boolean;
  login: (refreshToken: string, accessToken: string) => void;
  removeUser: () => void;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  accessToken: string | null;
  refreshToken: string | null;
  profile: Profile | null;
  fetchProfile: () => Promise<Profile | null>;
  authedFetch: (url: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;
};


export const UserContext = React.createContext<UserContextType>({
  fetchAccessToken: () => {},
  isLoggedIn: false,
  login: () => {},
  removeUser: () => {},
  setAccessToken: () => {},
  setRefreshToken: () => {},
  accessToken: null,
  refreshToken: null,
  profile: null,
  fetchProfile: () => Promise.resolve(null),
  authedFetch: () => Promise.resolve(new Response()),
});
