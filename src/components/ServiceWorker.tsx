import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { UpdateAvailableAlert } from './UpdateAvailableAlert';

export const ServiceWorker = () => {
  useEffect(() => {
    // Listen for the PWA update event
    const handleUpdate = (event: CustomEvent) => {
      console.info('Service worker: update available.');
      
      toast.info(({ closeToast }) => <UpdateAvailableAlert closeToast={closeToast} />, {
        position: 'bottom-right',
        autoClose: false,
        hideProgressBar: true,
        toastId: 'app_update_prompt',
      });
    };

    // Listen for the PWA success event
    const handleSuccess = (event: CustomEvent) => {
      console.info('Service worker: successfully registered.');
    };

    window.addEventListener('vite-pwa:update', handleUpdate as EventListener);
    window.addEventListener('vite-pwa:success', handleSuccess as EventListener);

    return () => {
      window.removeEventListener('vite-pwa:update', handleUpdate as EventListener);
      window.removeEventListener('vite-pwa:success', handleSuccess as EventListener);
    };
  }, []);

  return null;
};
