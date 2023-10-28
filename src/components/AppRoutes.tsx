import { Redirect, Route, Switch } from 'react-router-dom';
import { SingleTokenPage, BestBuyPage } from '../pages';
import { Settingspage } from '../pages/SettingsPage/SettingsPage';
import { routes } from '../config/routes';

export const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path={routes.SINGLE} component={SingleTokenPage} />
      <Route exact path={routes.BEST_DCA} component={BestBuyPage} />
      <Route
        exact
        path={routes.BEST_BUY}
        render={() => <BestBuyPage sdMultiplier={2} />}
      />
      <Route exact path={routes.SETTINGS} component={Settingspage} />
      {/* Default route */}
      <Redirect to={routes.BEST_DCA} />
    </Switch>
  );
};
