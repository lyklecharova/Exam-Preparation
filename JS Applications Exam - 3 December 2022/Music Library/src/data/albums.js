import { get, post, put, del } from "./api.js";

const endpoints = {
  album: "/data/albums?sortBy=_createdOn%20desc",
  byId: "/data/albums/",
  create: "/data/albums",
};

export async function getAllAlbums() {
    return get(endpoints.album);
  }
  
  export async function getById(id) {
    return get(endpoints.byId + id);
  }
  
  export async function createAlbum(album) {
    return post(endpoints.create, album);
  }
  
  export async function updateAlbum(id, album) {
    return put(endpoints.byId + id, album);
  }
  
  export async function deleteAlbum(id) {
    return del(endpoints.byId + id);
  }
