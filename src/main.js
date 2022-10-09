import { router } from "./router/index.routes.js";
import "./style.css";

const init = async () => {
  await router("#/Commentsbypost");
  window.addEventListener("hashchange", async () => {
    await router(window.location.hash);
  });
};

window.addEventListener("load", init);
