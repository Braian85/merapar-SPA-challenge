import view from "../view/commentsbyauthor.html";
import { getComments, getPosts, getUsers } from "../data/index.js";

export default () => {
  const commentsByAuthor = document.createElement("div");
  commentsByAuthor.innerHTML = view;

  Promise.all([getComments(), getUsers(), getPosts()]).then(
    ([comments, users, posts]) => {
      // users with comments
      const usersWithComments = [];
      comments.data.forEach((comment) => {
        if (!usersWithComments.includes(comment.user_id)) {
          usersWithComments.push(comment.user_id);
        }
      });
      console.log("userWithComments", usersWithComments);
      console.log("users: ", users.data);
      console.log("comments: ", comments);
      console.log("posts: ", posts);

      usersWithComments.forEach((user) => {
        const username = users.data.find((u) => u.id === user).name;
        const userDiv = document.createElement("div");

        userDiv.innerHTML = `
          <div class="user__container">
            <div class="post__header">
              <div class="image__container">
                <img class="user__image" src="https://i.pravatar.cc/100?img=${user}" alt="${username}" />
             </div>
            <div class="user__info">
             <span class="post__username"> 
                ${username}
              </span>
              </div>
           </div>
           <button id="btn ${user}" class="comment__button">Comments</button> 

            <div class="comments__container" id="comments ${user}">
            ${comments.data
              .filter((comment) => comment.user_id === user)
              .map(
                (comment) => `<div class="comment__post__item">
                <div> <b>Post title:</b> ${
                  posts.data.find((post) => post.id === comment.post_id)
                    ? posts.data.find((post) => post.id === comment.post_id)
                        .title
                    : `Not available`
                } </div>
                         <div class="comment__body author">
                          <b>Comment:</b> ${comment.body}
                          </div>
                        </div>`
              )
              .join("")}      
            </div>
          </div>
        `;
        commentsByAuthor.appendChild(userDiv);
      });
      function handleCommentClick(e) {
        console.log("event: ", e.target.id);
        const commentsContainer = document.getElementById(
          `comments ${e.target.id.split(" ")[1]}`
        );
        // toggle display style
        if (window.getComputedStyle(commentsContainer).display === "none") {
          commentsContainer.style.display = "flex";
        } else {
          commentsContainer.style.display = "none";
        }
      }

      const commentBtnElements =
        document.getElementsByClassName("comment__button");
      const commentBtnElementsLength = commentBtnElements.length;
      for (let i = 0; i < commentBtnElementsLength; i++) {
        commentBtnElements[i].addEventListener("click", handleCommentClick);
      }
    }
  );
  return commentsByAuthor;
};
