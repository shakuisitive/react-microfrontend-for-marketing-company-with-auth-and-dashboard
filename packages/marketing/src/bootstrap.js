import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";

function mount(el, { onNavigate, defaultHistory }) {
  let history = defaultHistory || createMemoryHistory();

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathName }) {
      if (history.pathname !== nextPathName) {
        history.push(nextPathName);
      }
    },
  };
}

if (process.env.NODE_ENV === "development") {
  let devRoot = document.querySelector("#_marketing-dev-root");

  if (devRoot) {
    mount(devRoot, {
      defaultHistory: createBrowserHistory(),
    });
  }
}

export { mount };
