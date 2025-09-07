import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

function mount(el, { onNavigate, defaultHistory }) {
  let history = defaultHistory || createMemoryHistory();

  // doing below will trigger a change in container
  // each time there's a change in this marketing remote app

  if (onNavigate) {
    // doing this condition so things work in isolation too
    history.listen(onNavigate);
  }
  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathName }) {
      let { pathname } = history.location;
      if (pathname !== nextPathName) {
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
