import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Header from "./components/Header";

import Progress from "./components/Progress";

let MarketingLazy = lazy(() => import("./components/MarketingApp"));
let AuthLazy = lazy(() => import("./components/AuthApp"));
let DashboardLazy = lazy(() => import("./components/DashboardApp"));
<Route path="/" component={MarketingLazy} />;

let generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {
  let [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <BrowserRouter>
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
              {/* <Route path="/auth" component={AuthLazy} /> */}
              <Route path="/dashboard" component={DashboardLazy} />
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
