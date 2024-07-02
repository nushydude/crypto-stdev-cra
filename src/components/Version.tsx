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

  const redirect = useCallback(() => {
    history.push(routes.PLAYGROUND);
  }, [history]);

  const hasReachedThreshold =
    clickCount >= clickCountThresholdToRedirectToPlayground;

  useEffect(() => {
    if (hasReachedThreshold) {
      redirect();
    }
  }, [hasReachedThreshold, redirect]);

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
