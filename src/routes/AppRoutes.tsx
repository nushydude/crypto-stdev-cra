import React from "react";
import { Route, Switch } from "react-router-dom";
import { SingleTokenPage, BestBuyPage } from "../pages";
import { Settingspage } from "../pages/SettingsPage/SettingsPage";

export const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={SingleTokenPage} />
      <Route exact path="/best-dca" component={BestBuyPage} />
      <Route
        exact
        path="/best-buy"
        render={() => <BestBuyPage sdMultiplier={2} />}
      />
      <Route exact path="/settings" component={Settingspage} />
    </Switch>
  );
};
