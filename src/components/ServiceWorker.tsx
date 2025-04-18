import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UpdateAvailableAlert } from './UpdateAvailableAlert';

export const ServiceWorker = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  // Listen for service worker events
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const handleControllerChange = () => {
        setUpdateAvailable(true);
      };

      const handleMessage = (event: MessageEvent) => {
        if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
          setUpdateAvailable(true);
        }
      };

      navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);
      navigator.serviceWorker.addEventListener('message', handleMessage);

      return () => {
        navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
        navigator.serviceWorker.removeEventListener('message', handleMessage);
      };
    }
  }, []);

  // Show update notification when state changes
  useEffect(() => {
    if (updateAvailable) {
      toast(({ closeToast }) => <UpdateAvailableAlert closeToast={closeToast} />, {
        position: 'bottom-right',
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      });
    }
  }, [updateAvailable]);

  return null;
};
