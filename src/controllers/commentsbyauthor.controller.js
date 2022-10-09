import view from "../view/commentsbyauthor.html";
import { getComments, getUsers } from "../data/index.js";

export default () => {
  const commentsByAuthor = document.createElement("div");
  commentsByAuthor.innerHTML = view;

  Promise.all([getComments(), getUsers()]).then(([comments, users]) => {
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

    usersWithComments.forEach((user) => {
      const username = users.data.find((u) => u.id === user).name;
      const userDiv = document.createElement("div");
      userDiv.innerHTML = `
          <div class="user__container">
            <div class="user__name">${username}</div>
            <div class="user__comments">  
              ${comments.data
                .filter((comment) => comment.user_id === user)
                .map(
                  (comment) => `
                  <div class="comment__container">
                    <div class="comment__body">${comment.body}</div>
                  </div>
                `
                )
                .join("\n")}
            </div>
          </div>`;
      commentsByAuthor.appendChild(userDiv);
    });
  });

  return commentsByAuthor;
};
