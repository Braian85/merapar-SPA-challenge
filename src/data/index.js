import comments from "./comments.json" assert { type: "json" };
import posts from "./posts.json" assert { type: "json" };
import users from "./users.json" assert { type: "json" };

const generateDelayTime = () => Math.random() * 1500 + 100;

export const getComments = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve(comments), generateDelayTime())
  );
export const getPosts = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve(posts), generateDelayTime())
  );
export const getUsers = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve(users), generateDelayTime())
  );
