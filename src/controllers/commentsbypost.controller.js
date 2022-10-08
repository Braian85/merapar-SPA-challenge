import view from "../view/commentsbypost.html";
import { getComments, getPosts, getUsers } from "../data/index.js";

export default () => {
  const commentsByPost = document.createElement("div");
  commentsByPost.innerHTML = view;
  return commentsByPost;
};
