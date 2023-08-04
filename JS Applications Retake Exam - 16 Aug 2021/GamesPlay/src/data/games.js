import { get, post, put, del } from "./api.js";

const endpoints = {
  catalog:  "/data/games?sortBy=_createdOn%20desc",
  byId: "/data/games/",
  create: "/data/games",
  newGames: "/data/games?sortBy=_createdOn%20desc&distinct=category",
};
export async function getAllGames() {
  return get(endpoints.catalog);
}

export async function getById(id) {
  return get(endpoints.byId + id);
}

export async function createGame(data) {
  return post(endpoints.create, data);
}

export async function updateGame(id, data) {
  return put(endpoints.byId + id, data);
}

export async function deleteGame(id) {
  return del(endpoints.byId + id);
}

export async function getNew() {
  return get(endpoints.newGames);
}