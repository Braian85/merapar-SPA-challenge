import { router } from "./router/index.routes.js";
import './style.css';

const init = () => {
  router(window.location.hash);

  window.addEventListener("hashchange", () => {
    router(window.location.hash);
  });
};

window.addEventListener("load", init);