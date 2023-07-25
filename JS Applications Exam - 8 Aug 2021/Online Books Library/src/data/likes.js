import { post, get } from "./api.js";

const endpoints = {
  likes: "/data/likes",
  byBookId: (bookId) =>
    `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
  byBookIdandUserId: (bookId, userId) =>
    `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function like(bookId) {
  return post(endpoints.likes, { bookId });
}

export async function getLikes(bookId) {
  return get(endpoints.byBookId(bookId));
}

export async function getUserLikes(bookId, userId) {
  return get(endpoints.byBookIdandUserId(bookId, userId));
}
