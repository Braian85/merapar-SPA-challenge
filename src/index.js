import { getComments, getPosts, getUsers } from "./data/index.js";

// console.time('comments')
// getComments().then((comments) => {
//   console.timeLog('comments', comments);
// });

// console.time('posts');
// getPosts().then((posts) => {
//   console.timeLog('posts', posts);
// });

// console.time('users');
// getUsers().then((users) => {
//   console.timeLog('users', users);
// });

Promise.all([getComments(), getPosts(), getUsers()]).then(
  ([comments, posts, users]) => {
    // console.log({ comments, posts, users });
    const postsWithUsers = posts.data.map((post) => ({
      ...post,
      user: users.data.find((user) => user.id === post.user_id),
    }));

    console.log(postsWithUsers);

    const app = document.getElementById("root");
    postsWithUsers.forEach((post) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="post__container">
        <div class="post__header">
          <div class="image__container">
            <img class="user__image" src="https://i.pravatar.cc/100?img=${post.user_id}" alt="${post.title}" />
          </div>
          <div class="user__info">
          <span class="post__username">
            ${post.user.name}
          </span>
          <span class="post__date">
             ${post.created_at}
          </span>
          </div>
         </div>
         <div class="post__title">
         ${post.title}
         </div>
        <div class="post__body">${post.body}</div>
      </div>
      `;
      app.appendChild(div);
    });
  }
);

// document.getElementById("root").innerHTML = "Loading...";
