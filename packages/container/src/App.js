import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Header from "./components/Header";
// import MarketingApp from "./components/MarketingApp";
// import AuthApp from "./components/AuthApp";

import Progress from "./components/Progress";

let MarketingLazy = lazy(() => import("./components/MarketingApp"));
let AuthLazy = lazy(() => import("./components/AuthApp"));

let generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {
  let [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    console.log(isSignedIn);
  }, [isSignedIn]);
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isSignedIn={isSignedIn} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              {/* <Route path="/auth" component={AuthLazy} /> */}
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
