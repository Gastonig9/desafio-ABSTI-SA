import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";
import { router } from "./router/router";

const initApp = () => {
  router(window.location.hash);

  window.addEventListener("hashchange", () => {
    router(window.location.hash);
  });
};


window.addEventListener("load", initApp);