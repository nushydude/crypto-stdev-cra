import { useContext, useEffect, useState } from 'react';
import { AppSettingsContext } from '../context/appSettings';
import fetchUserWatchPairs from '../utils/fetchUserWatchPairs';
import setUserWatchPairs from '../utils/setUserWatchPairs';
import useUser from './useUser';

const useWatchPairs = () => {
  // if you are logged in, fetch them from the user account,
  // else fetch them from the local storage
  const { settings, updateSettings } = useContext(AppSettingsContext);
  const { isLoggedIn, accessToken, fetchAccessToken, setAccessToken } =
    useUser();
  const [watchPairs, setWatchPairs] = useState<string[]>([]);

  const updateWatchPairs = (newWatchPairs: string[]) => {
    if (isLoggedIn && accessToken) {
      setUserWatchPairs(
        accessToken,
        fetchAccessToken,
        setAccessToken,
        newWatchPairs,
      ).then(({ watchPairs }) => {
        setWatchPairs(watchPairs);
      });
    } else {
      const newSettings = {
        ...settings,
        bestBuySymbols: newWatchPairs,
      };

      updateSettings(newSettings);
      setWatchPairs(newWatchPairs);
    }
  };

  useEffect(() => {
    if (isLoggedIn && accessToken) {
      fetchUserWatchPairs(accessToken, fetchAccessToken).then((watchPairs) => {
        setWatchPairs(watchPairs);
      });
    } else {
      setWatchPairs(settings.bestBuySymbols);
    }
  }, [isLoggedIn, accessToken, fetchAccessToken, settings.bestBuySymbols]);

  return { watchPairs, updateWatchPairs };
};

export default useWatchPairs;
