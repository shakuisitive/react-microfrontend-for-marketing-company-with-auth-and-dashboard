import { createApp } from "vue";
import Dashboard from "./components/Dashboard.vue";

function mount(el) {
  let app = createApp(Dashboard);
  app.mount(el);
}

if (process.env.NODE_ENV === "development") {
  let devRoot = document.querySelector("#_dashboard-dev-root");

  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
