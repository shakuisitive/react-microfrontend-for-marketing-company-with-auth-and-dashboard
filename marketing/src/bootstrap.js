import React from "react";
import ReactDOM from "react-dom";

function mount(el) {
  ReactDOM.render(<h1>hello world</h1>, el);
}

if (process.env.NODE_ENV === "development") {
  let devRoot = document.querySelector("#_marketing-dev-root");

  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
