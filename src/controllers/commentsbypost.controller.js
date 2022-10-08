import view from "../view/commentsbypost.html";

export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = view;

  const btnClick = divElement.querySelector("#btnClick");
  btnClick.addEventListener("click", () => {
    alert("clicked");
  });

  return divElement;
};