import { useEffect } from 'react';
import * as serviceWorkerRegistration from '../serviceWorkerRegistration';
// import { toast } from 'react-toastify';
// import { UpdateAvailableAlert } from './UpdateAvailableAlert';

export const ServiceWorker = () => {
  useEffect(() => {
    console.info('sw registration no config');

    serviceWorkerRegistration.register({
      onUpdate: (registration: ServiceWorkerRegistration) => {
        console.info('Service worker: update available.');

        // toast.info(<UpdateAvailableAlert />, {
        //   position: 'bottom-right',
        //   autoClose: false,
        //   hideProgressBar: true,
        //   toastId: 'app_update_prompt',
        // });
      },
      onSuccess: (registration: ServiceWorkerRegistration) => {
        console.info('Service worker: successfully registered.');
      },
    });
  }, []);

  return null;
};
