import { pages } from "../controllers/index.js";

const router = async (route) => {
  let content = document.getElementById("root");
  content.innerHTML = "";

  console.log(route);

  switch (route) {
    case "#/Home": {
      return content.appendChild(pages.home());
    }
    case "#/commentsbypost": {
      console.log("commentsbypost");
      return content.appendChild(await pages.commentsByPost());
    }
    case "#/postsbyauthor": {
      return content.appendChild(await pages.postsByAuthor());
    }
    case "#/commentsbyauthor": {
      return content.appendChild(await pages.commentsByAuthor());
    }
    default: {
      return content.appendChild(pages.notFound());
    }
  }
};

export { router };