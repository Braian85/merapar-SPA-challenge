import view from "../view/commentsbyauthor.html";
import { getComments, getPosts, getUsers } from "../data/index.js";

export default () => {
  const commentsByAuthor = document.createElement("div");
  commentsByAuthor.innerHTML = view;
  return commentsByAuthor;
};
