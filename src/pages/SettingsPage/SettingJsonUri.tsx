import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocalStorage } from 'react-use';
import { toast, ToastPosition } from 'react-toastify';
import { DEFAULT_SETTINGS } from '../../consts/DefaultSettings';
import { config } from '../../config';

const toastOptions = {
  position: 'top-center' as ToastPosition,
  autoClose: 5000,
  hideProgressBar: true,
  newestOnTop: true,
  closeOnClick: true,
};

type FieldValues = {
  settingsJsonUri: string;
};

interface Props {
  onUpdate: Function;
}

export const SettingsJsonUri: React.FC<Props> = ({ onUpdate }) => {
  const [uri, setUri, removeUri] = useLocalStorage('settings-json-uri', '');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSettings, removeSettings] = useLocalStorage(
    'settings',
    JSON.stringify(DEFAULT_SETTINGS),
  );

  const updateSettings = (newSettings: Object) => {
    setSettings(JSON.stringify(newSettings));
    onUpdate(newSettings);
  };

  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {},
  });

  const onSubmit = async ({ settingsJsonUri }: FieldValues) => {
    // if cleared
    if (!settingsJsonUri) {
      toast.warning(
        'Settings file removed. Reverting to defaults.',
        toastOptions,
      );
      updateSettings(DEFAULT_SETTINGS);
      removeUri();
      return;
    }

    // Check if input is a JSON string
    try {
      const parsedJson = JSON.parse(settingsJsonUri);
      // It's a valid JSON string, use it as settings
      setUri(settingsJsonUri);
      updateSettings(parsedJson);
      toast.success(
        'Woohoo! Settings parsed and updated from the JSON string.',
        toastOptions,
      );
      return;
    } catch (error) {
      // It's not a JSON string, continue to check if it's a URL
    }

    // fetch JSON file
    try {
      const res = await fetch(`${config.API_URI}/api/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uri: settingsJsonUri }),
      });

      // parse JSON file
      const settingsJson = await res.json();

      // save settings
      const { success, /* errorMessage, */ data } = settingsJson;

      if (success) {
        setUri(settingsJsonUri);
        updateSettings(data);
        toast.success('Woohoo! Settings downloaded and updated.', toastOptions);
      } else {
        toast.error(
          'Sorry, could not update settings. Keeping old settings untouched.',
          {
            ...toastOptions,
            toastId: 'Exception',
          },
        );
      }
    } catch (error) {
      toast.error(
        'Sorry, could not update settings. Keeping old settings untouched.',
        {
          ...toastOptions,
          toastId: 'Exception',
        },
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="mb-4 font-bold">Settings JSON URI</h3>

        <div className="grid gap-2 mb-4 grid-cols-settings-upload">
          <input
            id="settingsJsonUri"
            defaultValue={uri}
            title={uri}
            className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            {...register('settingsJsonUri')}
          />

          <button
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {uri ? 'Update' : 'Save'}
          </button>
        </div>
      </form>

      <p className="font-bold">Note:</p>
      <p>
        If using a shared link from Google Drive, make sure to run it through{' '}
        <a
          href="https://sites.google.com/site/gdocs2direct/"
          className="text-blue-700 hover:underline"
        >
          Google Drive Direct Link Generator
        </a>{' '}
        first to get the direct link and paste it in the box above.
      </p>
    </div>
  );
};
