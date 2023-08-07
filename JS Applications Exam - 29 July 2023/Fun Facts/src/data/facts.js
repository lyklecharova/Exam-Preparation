import { get, post, put, del } from "./api.js";

const endpoints = {
  catalog: "/data/facts?sortBy=_createdOn%20desc",
  byId: "/data/facts/",
  create: "/data/facts",
  
};

export async function getAllFact() {
  return get(endpoints.catalog);
}

export async function getById(id) {
  return get(endpoints.byId + id);
}

export async function createFact(fact) {
  return post(endpoints.create, fact);
}

export async function updateFact(id, fact) {
  return put(endpoints.byId + id, fact);
}

export async function deleteFact(id) {
  return del(endpoints.byId + id);
}