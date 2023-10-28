import React from 'react';
import { useLocalStorage } from 'react-use';
import { JsonViewer } from '@textea/json-viewer';
import { DEFAULT_SETTINGS } from '../../consts/DefaultSettings';

export const CurrentSettings: React.FC = () => {
  const [settings] = useLocalStorage(
    'settings',
    JSON.stringify(DEFAULT_SETTINGS),
  );

  const downloadJSON = async () => {
    if (settings) {
      const hiddenElement = document.createElement('a');
      hiddenElement.href =
        'data:application/json;charset=utf-8,' + encodeURI(settings);
      hiddenElement.target = '_blank';
      hiddenElement.download = 'Crypto-Stdev-Settings.json';
      hiddenElement.click();
    }
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      <h3 className="mb-2 font-bold">
        Current Settings
        {settings ? (
          <button
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            onClick={async () => {
              await downloadJSON();
            }}
          >
            Download
          </button>
        ) : null}
      </h3>

      {settings ? <JsonViewer value={JSON.parse(settings)} /> : null}
    </div>
  );
};
