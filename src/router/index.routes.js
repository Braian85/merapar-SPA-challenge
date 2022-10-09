import { pages } from "../controllers/index.js";

const router = async (route) => {
  let content = document.getElementById("root");
  content.innerHTML = "";
  
  switch (route) {
    case "#/Commentsbypost": {
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
