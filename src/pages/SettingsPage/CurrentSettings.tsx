import { useLocalStorage } from 'react-use';
import { JsonViewer } from '@textea/json-viewer';
import { MdFileDownload } from 'react-icons/md';
import { DEFAULT_SETTINGS } from '../../consts/DefaultSettings';

const CurrentSettings = () => {
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
      <div className="flex items-center mb-4">
        <h3 className="font-bold">Current Settings</h3>

        {settings && (
          <button
            className="flex items-center ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            onClick={async () => {
              // we don't need to await this, right?
              await downloadJSON();
            }}
          >
            <MdFileDownload className="mr-1" />
            <span>Download</span>
          </button>
        )}
      </div>

      {settings ? <JsonViewer value={JSON.parse(settings)} /> : null}
    </div>
  );
};

export default CurrentSettings;
