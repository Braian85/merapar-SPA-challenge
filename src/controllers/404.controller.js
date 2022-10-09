import view from "../view/404.html";

export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = view;
  const spinner = document.getElementsByClassName("lds-roller")[0]
  spinner.style.display = "none";
  return divElement;
};
