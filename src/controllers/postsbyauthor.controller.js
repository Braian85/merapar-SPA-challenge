import view from "../view/postsbyauthor.html";
import { getComments, getPosts, getUsers } from "../data/index.js";

export default () => {
  const postsByAuthor = document.createElement("div");
  postsByAuthor.innerHTML = view;
  const spinner = document.getElementsByClassName("lds-roller")[0]
  spinner.style.display = "block";

  Promise.all([getPosts(), getUsers()]).then(([posts, users]) => {
    spinner.style.display = "none";
    // users with posts
    const usersWithPosts = [];
    posts.data.forEach((post) => {
      if (!usersWithPosts.includes(post.user_id)) {
        usersWithPosts.push(post.user_id);
      }
    });

    usersWithPosts.forEach((user) => {
      const username = users.data.find((u) => u.id === user).name;
      const userDiv = document.createElement("div");
      userDiv.innerHTML = `
        <div class="user__container">
          <div class="post__header">
            <img class="user__image" src="https://i.pravatar.cc/100?img=${user}" alt="${username}" />
            <div class="user__info">
             <div class="post__username">${username}</div>
            </div>
            
            </div>
            <button class="post__button" id="btn ${user}">Posts</button>
            <div class="user__posts">
            <div class="post__container post__container-hidden" id="posts ${user}">
          <ul>
          ${posts.data
            .filter((post) => post.user_id === user)
            .map(
              (post) => `
                <li class="post__title">${post.title}</li>
            `
            )
            .join("\n")}

          </ul>
          </div>
          </div>
        </div>`;
      postsByAuthor.appendChild(userDiv);
    });
    function handlePostClick(e) {
      const postsContainer = document.getElementById(`posts ${e.target.id.split(" ")[1]}`);
      // toggle display style
      if (window.getComputedStyle(postsContainer).display === "none") {
        postsContainer.style.display = "flex";
      } else {
        postsContainer.style.display = "none";
      }
    }

    const postBtnElements = document.getElementsByClassName("post__button");
    const postBtnElementsLength = postBtnElements.length;
    for (let i = 0; i < postBtnElementsLength; i++) {
      postBtnElements[i].addEventListener("click", handlePostClick);
    }
  });
  return postsByAuthor;
};
