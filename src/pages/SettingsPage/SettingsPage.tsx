import React, { useState } from 'react';
import styled from 'styled-components';
import { CurrentSettings } from './CurrentSettings';
import { SettingsJsonUri } from './SettingJsonUri';

const Row = styled.div`
  margin: 10px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`;

export const Settingspage: React.FC = () => {
  // This is a hack.
  // Whenever the settings are updated, SettingsJsonUri calls onUpdate prop.
  // which increments value. Setting it on key of CurrentSettings make it
  // to remount, making it reload the settings.
  const [value, forceRefreshCurrentSettings] = useState<number>(0);

  const incrementKeyValueToForceUpdate = () => {
    forceRefreshCurrentSettings((oldValue) => oldValue + 1);
  };

  return (
    <>
      <Row>
        <SettingsJsonUri onUpdate={incrementKeyValueToForceUpdate} />
      </Row>
      <Row>
        <CurrentSettings key={value} />
      </Row>
    </>
  );
};
