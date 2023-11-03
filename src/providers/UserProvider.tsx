import { useCallback, useState } from 'react';
import { UserContext } from '../context/user';
import usePersistedState from '../hooks/usePersistedState';

const STATE_KEY = 'user_state';

type User = {
  accessToken?: string | null;
  refreshToken: string;
};

const INITIAL_STATE = {
  user: null,
};

type Props = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: Props) => {
  const [value, setValue] = useState<{ user: User | null }>(INITIAL_STATE);
  const hasMounted = usePersistedState(
    STATE_KEY,
    value,
    INITIAL_STATE,
    setValue,
  );

  const setAccessToken = useCallback((accessToken: string) => {
    setValue((user) => ({ ...user, accessToken }));
  }, []);

  const setRefreshToken = useCallback((refreshToken: string) => {
    setValue((user) => ({ ...user, refreshToken }));
  }, []);

  const removeUser = useCallback(() => {
    setValue({ user: null });
  }, []);

  const login = useCallback((refreshToken: string, accessToken: string) => {
    setValue({ user: { accessToken, refreshToken } });
  }, []);

  const isLoggedIn = !!value.user?.refreshToken;

  if (!hasMounted) {
    return null;
  }

  return (
    <UserContext.Provider
      value={{
        ...value,
        setAccessToken,
        setRefreshToken,
        removeUser,
        isLoggedIn,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
