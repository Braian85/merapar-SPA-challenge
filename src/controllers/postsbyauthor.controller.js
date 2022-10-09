import view from "../view/postsbyauthor.html";
import { getComments, getPosts, getUsers } from "../data/index.js";

export default () => {
  const postsByAuthor = document.createElement("div");
  postsByAuthor.innerHTML = view;

  Promise.all([getPosts(), getUsers()]).then(([posts, users]) => {
    // users with posts
    const usersWithPosts = [];
    posts.data.forEach((post) => {
      if (!usersWithPosts.includes(post.user_id)) {
        usersWithPosts.push(post.user_id);
      }
    });
    console.log("userWithPosts", usersWithPosts);
    console.log("users: ", users.data);
    console.log("posts: ", posts);

    usersWithPosts.forEach((user) => {
      const username = users.data.find((u) => u.id === user).name;
      const userDiv = document.createElement("div");
      userDiv.innerHTML = `
        <div class="user__container">
          <div class="user__name">${username}</div>
          <div class="user__posts">
            ${posts.data
              .filter((post) => post.user_id === user)
              .map(
                (post) => `
                <div class="post__container">
                  <div class="post__title">${post.title}</div>
                </div>
              `
              )
              .join("\n")}
          </div>
        </div>`;
      postsByAuthor.appendChild(userDiv);
    });
  });
  return postsByAuthor;
};
