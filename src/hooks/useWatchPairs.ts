import { useContext, useEffect, useState, useCallback } from 'react';
import { AppSettingsContext } from '../context/appSettings';
import fetchUserWatchPairs from '../utils/fetchUserWatchPairs';
import setUserWatchPairs from '../utils/setUserWatchPairs';
import useUser from './useUser';

const useWatchPairs = () => {
  const { settings, updateSettings } = useContext(AppSettingsContext);
  const { isLoggedIn, authedFetch } = useUser();
  const [watchPairs, setWatchPairs] = useState<string[]>([]);

  const fetchWatchPairs = useCallback(() => {
    return fetchUserWatchPairs(authedFetch)
      .catch((_error) => [])
  }, [authedFetch]);

  const updateLocalWatchPairs = useCallback((newWatchPairs: string[]) => {
    updateSettings({...settings, bestBuySymbols: newWatchPairs});
  }, [settings, updateSettings]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchWatchPairs().then((fetchedWatchPairs) => {
        setWatchPairs(fetchedWatchPairs);
      }).catch((_error) => {
        setWatchPairs(settings.bestBuySymbols);
      });
    } else {
      setWatchPairs(settings.bestBuySymbols);
    }
  }, [isLoggedIn, settings.bestBuySymbols, fetchWatchPairs]);

  const updateWatchPairs = useCallback(async (newWatchPairs: string[]) => {
    try {
      if (isLoggedIn) {
        const updatedWatchPairs = await setUserWatchPairs(authedFetch, newWatchPairs);
        setWatchPairs(updatedWatchPairs);
      } else {
        updateLocalWatchPairs(newWatchPairs);
        setWatchPairs(newWatchPairs);
      }
    } catch (_error) {}
  }, [isLoggedIn, authedFetch, updateLocalWatchPairs]);

  return { watchPairs, updateWatchPairs };
};

export default useWatchPairs;
