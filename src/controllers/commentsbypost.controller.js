import view from "../view/home.html";
import { getComments, getPosts, getUsers } from "../data/index.js";

export default () => {
  const home = document.createElement("div");
  home.innerHTML = view;
  Promise.all([getComments(), getPosts(), getUsers()])
    .then(([comments, posts, users]) => {
      const postsWithUsersAndComments = posts.data.map((post) => ({
        ...post,
        user: users.data.find((user) => user.id === post.user_id),
        comments: comments.data.filter(
          (comment) => comment.post_id === post.id
        ),
      }));

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
          }" class="comment__button" onclick='${handleCommentClick}'>Comments (${
          post.comments.length
        })</button>       
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
        home.appendChild(div);
      });
      // aca va la logica de capturar botones !!
      function handleCommentClick(e) {
        const commentsContainer = document.getElementById(
          `comments ${e.target.id.split("btn ")[1]}`
        );
        // toggle display style

        if (window.getComputedStyle(commentsContainer).display === "none") {
          commentsContainer.style.display = "flex";
        } else {
          commentsContainer.style.display = "none";
        }
      }

      const btnElements = document.getElementsByClassName("comment__button");
      const btnElementsLength = btnElements.length;
      for (let i = 0; i < btnElementsLength; i++) {
        btnElements[i].addEventListener("click", handleCommentClick);
      }
    })
    .catch((err) => console.log(err));
  return home;
};
