import { post, get } from "./api.js";

const endpoints = {
  showComments: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
  doComment: "/data/comments",
};

export async function getComments(gameId) {
  return get(endpoints.showComments(gameId));
}

export async function makeComment(gameId, comment) {
  return post(endpoints.doComment, { gameId, comment });
}
