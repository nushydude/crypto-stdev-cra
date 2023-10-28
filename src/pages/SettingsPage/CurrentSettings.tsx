import React from 'react';
import styled from 'styled-components';
import { useLocalStorage } from 'react-use';
import { JsonViewer } from '@textea/json-viewer';
import { DEFAULT_SETTINGS } from '../../consts/DefaultSettings';

const Container = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`;

const Heading = styled.h3`
  margin-bottom: 8px;
`;

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
    <Container>
      <Heading>
        Current settings{''}{' '}
        {settings ? (
          <button
            onClick={async () => {
              await downloadJSON();
            }}
          >
            Download
          </button>
        ) : null}
      </Heading>

      {settings ? <JsonViewer value={JSON.parse(settings)} /> : null}
    </Container>
  );
};
