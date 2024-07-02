import { useCallback, useEffect, useState } from 'react';
import { Profile, UserContext } from '../context/user';
import usePersistedState from '../hooks/usePersistedState';
import { appConfig } from '../config';
import { fetchWithToken } from '../utils/fetchWithToken';
import { fetchAccessTokenUsingRefreshToken } from '../utils/fetchAccessTokenUsingRefreshToken';

const STATE_KEY = 'user-state';

const INITIAL_STATE = {
  accessToken: null,
  refreshToken: null,
  profile: null,
};

type Props = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: Props) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

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
    setProfile(null);
  }, []);

  const fetchAccessToken = useCallback(
    () =>
      fetchAccessTokenUsingRefreshToken(refreshToken)
        .then((accessToken) => {
          setAccessToken(accessToken);
          return accessToken;
        })
        .catch((error) => {
          console.log(error);
          removeUser();
        }),
    [setAccessToken, refreshToken, removeUser],
  );

  const fetchProfile = useCallback(() => {
    if (!accessToken) {
      return Promise.resolve(null);
    }

    return fetchWithToken({
      url: `${appConfig.API_URI}/api/auth/profile`,
      accessToken,
      options: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
      refreshAccessToken: fetchAccessToken,
      setAccessToken,
    })
      .then((response) => response.json())
      .then((profile) => {
        if (profile) {
          setProfile(profile);

          return profile as Profile;
        } else {
          removeUser();
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
        // detect 401 error and retry
        return null;
      });
  }, [accessToken, fetchAccessToken, removeUser]);

  const login = useCallback(
    (refreshToken: string, accessToken: string) => {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      fetchProfile();
    },
    [fetchProfile],
  );

  const authedFetch = useCallback(
    (url: RequestInfo | URL, init?: RequestInit | undefined) => {
      return fetchWithToken({
        url,
        options: init,
        accessToken,
        refreshAccessToken: fetchAccessToken,
        setAccessToken,
      });
    },
    [accessToken, fetchAccessToken],
  );

  useEffect(() => {
    if (refreshToken) {
      fetchProfile();
    }
  }, [refreshToken, fetchProfile, removeUser]);

  if (!hasMounted) {
    return null;
  }

  const value = {
    accessToken,
    authedFetch,
    fetchAccessToken,
    fetchProfile,
    isLoggedIn: !!refreshToken,
    login,
    profile,
    refreshToken,
    removeUser,
    setAccessToken,
    setRefreshToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
