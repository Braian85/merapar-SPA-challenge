import Home from "./home.controller.js";
import CommentsByPost from "./commentsbypost.controller.js";
import PostsByAuthor from "./postsbyauthor.controller.js";
import CommentsByAuthor from "./commentsbyauthor.controller.js";
import NotFound from "./404.controller.js";

const pages = {
  home: Home,
  commentsByPost: CommentsByPost,
  postsByAuthor: PostsByAuthor,
  commentsByAuthor: CommentsByAuthor,
  notFound: NotFound,
};

export { pages };
