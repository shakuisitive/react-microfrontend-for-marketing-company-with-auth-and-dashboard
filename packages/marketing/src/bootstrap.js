import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory } from "history";
import App from "./App";

function mount(el, { onNavigate }) {
  let history = createMemoryHistory();

  // doing below will trigger a change in container
  // each time there's a change in this marketing remote app

  if (onNavigate) {
    // doing this condition so things work in isolation too
    history.listen(onNavigate);
  }
  ReactDOM.render(<App history={history} />, el);
}

if (process.env.NODE_ENV === "development") {
  let devRoot = document.querySelector("#_marketing-dev-root");

  if (devRoot) {
    mount(devRoot, {});
  }
}

export { mount };
