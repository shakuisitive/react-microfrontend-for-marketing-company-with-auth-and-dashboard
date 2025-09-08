import React, { lazy, Suspense, useEffect, useState } from "react";
import { Router, Redirect, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { createBrowserHistory } from "history";
import Header from "./components/Header";
import Progress from "./components/Progress";

let MarketingLazy = lazy(() => import("./components/MarketingApp"));
let AuthLazy = lazy(() => import("./components/AuthApp"));
let DashboardLazy = lazy(() => import("./components/DashboardApp"));
<Route path="/" component={MarketingLazy} />;

let generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

let history = createBrowserHistory();

export default () => {
  let [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    isSignedIn && history.push("/dashboard");
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            onSignOut={() => setIsSignedIn(false)}
            isSignedIn={isSignedIn}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardLazy />
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
