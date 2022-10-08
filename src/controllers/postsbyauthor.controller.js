import view from "../view/postsbyauthor.html";
import { getComments, getPosts, getUsers } from "../data/index.js";

export default () => {
  const postsByAuthor = document.createElement("div");
  postsByAuthor.innerHTML = view;
  return postsByAuthor;
};
