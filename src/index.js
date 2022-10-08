import { getComments, getPosts, getUsers } from "./data/index.js";

// const nav = document.createElement("div");
// nav.classList.add("nav");
// nav.innerHTML = `
//   <button class="nav__button" id="home">Home</button>
//   <button class="nav__button" id="posts">Posts</button>
//   <button class="nav__button" id="comments">Comments</button>
//   <button class="nav__button" id="users">Users</button>
// `;
let postsWithUsersAndComments = [];
const app = document.getElementById("root");

Promise.all([getComments(), getPosts(), getUsers()]).then(
  ([comments, posts, users]) => {
    // Home render logic
    function showHome() {
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
            (comment) => `<div class="comment__item">
                             <img class="comment__user__image" src="https://i.pravatar.cc/100?img=${
                               comment.user_id
                             }" alt="${comment.user_id}" />
                             <div class="comment__username">
                             ${
                               users.data.find(
                                 (user) => user.id === comment.user_id
                               ).name
                             }
                             </div>
                             <div class="comment__body">
                              ${comment.body}
                             </div>
                           </div>
          `
          )}
          </div>
        </div>
        `;
        app.appendChild(div);
      });
    }

    postsWithUsersAndComments = posts.data.map((post) => ({
      ...post,
      user: users.data.find((user) => user.id === post.user_id),
      comments: comments.data.filter((comment) => comment.post_id === post.id),
    }));
    
    // app.append(nav);

    // add event listener for nav buttons inside nav
    const navButtons = document.getElementsByClassName("nav__button");
    const navButtonsLength = navButtons.length;
    showHome();

    for (let i = 0; i < navButtonsLength; i++) {
      navButtons[i].addEventListener("click", (e) => {
        const id = e.target.id;
        console.log(id);
        // if id is home, show posts
        if (id === "home") {
          showHome();
        }
        if (id === "posts") {
          app.innerHTML = "";
          app.append(nav);
        }
      });
    }
  }
);
