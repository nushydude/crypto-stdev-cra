import { useCallback, useState } from 'react';
import { UserContext } from '../context/user';
import usePersistedState from '../hooks/usePersistedState';
import { config } from '../config';

const STATE_KEY = 'user-state';

const INITIAL_STATE = {
  accessToken: null,
  refreshToken: null,
};

type Props = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: Props) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const hasMounted = usePersistedState(
    STATE_KEY,
    { accessToken, refreshToken },
    INITIAL_STATE,
    (value) => {
      setAccessToken(value.accessToken ?? null);
      setRefreshToken(value.refreshToken ?? null);
    },
  );

  const removeUser = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
  }, []);

  const login = useCallback((refreshToken: string, accessToken: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  }, []);

  const isLoggedIn = !!refreshToken;

  const fetchAccessToken = useCallback(() => {
    if (!refreshToken) {
      return Promise.reject('No refresh token available');
    }

    return fetch(`${config.API_URI}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.accessToken) {
          setAccessToken(data.accessToken);

          return data.accessToken;
        } else {
          return Promise.reject('No access token available');
        }
      });
  }, [setAccessToken, refreshToken]);

  if (!hasMounted) {
    return null;
  }

  const value = {
    accessToken,
    fetchAccessToken,
    isLoggedIn,
    login,
    refreshToken,
    removeUser,
    setAccessToken,
    setRefreshToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
