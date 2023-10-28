import { useEffect, useState } from 'react';
import OneSignal from 'react-onesignal';

export const useOneSignal = () => {
  // const status = useScript("https://cdn.onesignal.com/sdks/OneSignalSDK.js");
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && !initialized) {
      // @ts-expect-error - this is set in Vercel env vars
      OneSignal.init({ appId: process.env.REACT_APP_ONESIGNAL_APP_ID }).then(
        () => {
          setInitialized(true);

          OneSignal.showSlidedownPrompt().then(() => {
            // do other stuff
          });
        },
      );
    }
  }, [initialized]);

  return { initialized };
};
