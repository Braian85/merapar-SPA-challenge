import { getComments, getPosts, getUsers } from "./data/index.js";

Promise.all([getComments(), getPosts(), getUsers()]).then(
  ([comments, posts, users]) => {
    // posts with users and comments
    const postsWithUsersAndComments = posts.data.map((post) => ({
      ...post,
      user: users.data.find((user) => user.id === post.user_id),
      comments: comments.data.filter((comment) => comment.post_id === post.id),
    }));
    console.log("users: ", users);

    console.log(postsWithUsersAndComments);

    const app = document.getElementById("root");
    postsWithUsersAndComments.forEach((post) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="post__container" id="${post.id}">
        <div class="post__header">
          <div class="image__container">
            <img class="user__image" src="https://i.pravatar.cc/100?img=${
              post.user_id
            }" alt="${post.title}" />
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
        <button id="btn ${
          post.id
        }" class="post__button">Comments</button>       
        <div class="comments__container" id="comments ${post.id}">
        ${post.comments.map(
          (comment) => `<div class="comment__body">
        <div>
        <img class="user__image" src="https://i.pravatar.cc/100?img=${
          comment.user_id
        }" alt="${comment.user_id}" />
        </div>
        ${users.data.find((user) => user.id === comment.user_id).name}
        ${comment.body}
        </div>`
        )}
        </div>
      </div>
      `;
      app.appendChild(div);
    });
    // document.getElementById(`btn ${post.id}`).addEventListener("click", (e) => {
    //   console.log(e.target.id);
    //   const comment = document.createElement("div");
    //   comment.innerHTML = `Comment ...`;
    //   console.log(comment);
    // });
  }
);
