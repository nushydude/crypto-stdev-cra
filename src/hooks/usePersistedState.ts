import { useEffect, useState } from 'react';

const usePersistedState = (
  stateKey: string,
  state: any,
  initialState: any,
  setState: (state: any) => void,
) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const saveState = async () => {
      try {
        localStorage.setItem(stateKey, JSON.stringify(state));
      } catch (error) {
        // Ignore
      }
    };

    // Only run the saveState function if the component has mounted before.
    if (hasMounted) {
      // This might run one unnecessary time soon after loading the state, but it's fine.
      saveState();
    }
  }, [stateKey, state, hasMounted]);

  useEffect(
    () => {
      const loadPersistedState = () => {
        try {
          const persistedState = localStorage.getItem(stateKey);

          if (persistedState) {
            const parsedState = JSON.parse(persistedState);

            // Filter out any fields from parsedState that are not present in initialState,
            // in case we want to clean up the staled states in the future.
            const filteredState = Object.keys(initialState).reduce(
              (result, key) => {
                if (parsedState[key]) {
                  return {
                    ...result,
                    [key]: parsedState[key],
                  };
                }

                return result;
              },
              initialState,
            );

            setState(filteredState);
          }
        } catch (error) {
          // Ignore
        } finally {
          setHasMounted(true);
        }
      };

      loadPersistedState();
    },
    // Only run this effect once, when the component mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return hasMounted;
};

export default usePersistedState;
