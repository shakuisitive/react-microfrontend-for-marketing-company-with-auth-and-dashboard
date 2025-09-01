import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";

function mount(el, { onSignIn, onNavigate, defaultHistory, initialPath }) {
  let history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathName }) {
      if (history.pathname !== nextPathName) {
        history.push(nextPathName);
      }
    },
  };
}

if (process.env.NODE_ENV === "development") {
  let devRoot = document.querySelector("#_auth-dev-root");

  if (devRoot) {
    mount(devRoot, {
      defaultHistory: createBrowserHistory(),
    });
  }
}

export { mount };
