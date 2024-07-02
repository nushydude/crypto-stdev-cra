import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { appConfig, routes } from '../config';

type Props = {
  clickCountThresholdToRedirectToPlayground?: number;
};

const Version = ({ clickCountThresholdToRedirectToPlayground = 6 }: Props) => {
  const history = useHistory();
  const [clickCount, setClickCount] = useState(0);

  const increment = useCallback(() => {
    setClickCount((c) => c + 1);
  }, []);

  useEffect(() => {
    if (clickCount >= clickCountThresholdToRedirectToPlayground) {
      setClickCount(0);
      history.push(routes.PLAYGROUND);
    }
  }, [history, clickCount, clickCountThresholdToRedirectToPlayground]);

  useEffect(() => {
    const timerID = setTimeout(() => {
      setClickCount(0);
    }, 2000);

    return () => clearTimeout(timerID);
  }, [clickCount]);

  return (
    <span className="inline-block" onClick={increment}>
      build {appConfig.BUILD_NUMBER}
    </span>
  );
};

export default Version;
