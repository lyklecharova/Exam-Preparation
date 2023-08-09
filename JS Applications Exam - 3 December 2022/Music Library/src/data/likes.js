import { post, get } from "./api.js";

const endpoints = {
  countLikes: "/data/likes",
  byAlbumId: (albumId) =>
    `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
  byAlbumIdAndUserId: (albumId, userId) =>
    `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function like(albumId) {
  return post(endpoints.countLikes, { albumId });
}

export async function getLikes(albumId) {
  return get(endpoints.byAlbumId(albumId));
}

export async function getUserLikes(albumId, userId) {
  return get(endpoints.byAlbumIdAndUserId(albumId, userId));
}
