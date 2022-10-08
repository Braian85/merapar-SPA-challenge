import { pages } from "../controllers/index.js";

const router = async (route) => {
  let content = document.getElementById("root");
  content.innerHTML = "";

  console.log(route);

  switch (route) {
    case "#/Home": {
      return content.appendChild(pages.home());
    }
    case "#/Commentsbypost": {
      console.log("commentsbypost");
      return content.appendChild(await pages.commentsByPost());
    }
    case "#/Postsbyauthor": {
      return content.appendChild(await pages.postsByAuthor());
    }
    case "#/Commentsbyauthor": {
      return content.appendChild(await pages.commentsByAuthor());
    }
    default: {
      return content.appendChild(pages.notFound());
    }
  }
};

export { router };