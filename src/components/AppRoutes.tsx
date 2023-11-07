import { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  SingleTokenPage,
  BestBuyPage,
  SettingsPage,
  LoginPage,
  SignupPage,
} from '../pages';
import { routes } from '../config/routes';
import ProfilePage from '../pages/ProfilePage';

const PlaygroundPage = lazy(() => import('../pages/PlaygroundPage'));

export const AppRoutes = () => {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route exact path={routes.SINGLE} component={SingleTokenPage} />
        <Route exact path={routes.BEST_DCA} component={BestBuyPage} />
        <Route
          exact
          path={routes.BEST_BUY}
          render={() => <BestBuyPage sdMultiplier={2} />}
        />
        <Route exact path={routes.SETTINGS} component={SettingsPage} />
        <Route exact path={routes.LOGIN} component={LoginPage} />
        <Route exact path={routes.SIGNUP} component={SignupPage} />
        <Route exact path={routes.PROFILE} component={ProfilePage} />

        <Route exact path={routes.PLAYGROUND} component={PlaygroundPage} />

        {/* Default route */}
        <Redirect to={routes.BEST_DCA} />
      </Switch>
    </Suspense>
  );
};
